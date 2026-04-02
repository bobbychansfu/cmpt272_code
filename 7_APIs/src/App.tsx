/* Ex 1 — Environment Variables with Vite 

import "./App.css"
import { useEffect, useState } from "react";

// Read the URL from the environment
const API_URL = import.meta.env.VITE_API_BASE_URL;

// Guard at startup — throws immediately if the var is missing or misspelled
if (!API_URL) {
  throw new Error(
    "VITE_API_BASE_URL is not set. " +
      "Add it to your .env file and restart the dev server."
  );
}

type RandomUser = {
  name: { first: string; last: string };
  email: string;
  picture: { medium: string };
};

function App() {
  const [user, setUser] = useState<RandomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API_URL comes from .env — visible in the browser bundle
    fetch(`${API_URL}/?results=1`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed: " + res.status);
        return res.json();
      })
      .then((data) => {
        setUser(data.results[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!user) return null;

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Random User (from Random User API)</h1>
      <p>
        <strong>API URL used:</strong>{" "}
        <code style={{ background: "#f0f0f0", padding: "2px 6px" }}>
          {API_URL}
        </code>
      </p>
      <p>
        <em>
          Open DevTools &gt; Sources and search for your VITE_ variable name to see it in the bundle. <br />
          This is why VITE_ vars are NOT secret.
        </em>
      </p>

      <hr />

      <img
        src={user.picture.medium}
        alt="avatar"
        style={{ borderRadius: "50%" }}
      />
      <h2>
        {user.name.first} {user.name.last}
      </h2>
      <p>{user.email}</p>
    </div>
  );
}

export default App;

*/


/* Ex 2 - JSONbin.io Demo */

import { useState, useEffect } from "react";
import "./App.css";
import styles from "./App.module.css";

// -- Config from .env -- //
const KEY = import.meta.env.VITE_JSONBIN_KEY as string;
const BIN_ID = import.meta.env.VITE_BIN_ID as string;

if (!KEY) throw new Error("VITE_JSONBIN_KEY is not set in .env");
if (!BIN_ID) throw new Error("VITE_BIN_ID is not set in .env");

const BASE = "https://api.jsonbin.io/v3";

type Score = {
  name: string;
  score: number;
  timestamp: string;
};

// CRUD functions for JSONbin
async function readBin(): Promise<Score[]> {
  const res = await fetch(`${BASE}/b/${BIN_ID}`, {
    headers: { "X-Master-Key": KEY },
  });
  if (!res.ok) throw new Error(`Read failed: ${res.status}`);
  const json = await res.json();
  // The actual data is always in json.record
  return json.record.scores ?? [];
}

async function writeBin(scores: Score[]): Promise<Score[]> {
  const res = await fetch(`${BASE}/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": KEY,
    },
    body: JSON.stringify({ scores }),
  });
  if (!res.ok) throw new Error(`Write failed: ${res.status}`);
  const json = await res.json();
  return json.record.scores ?? [];
}


// async function createBin(initialData: object): Promise<string> {
//   const res = await fetch(`${BASE}/b`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Master-Key": KEY,
//       "X-Bin-Name": "scores",  
//     },
//     body: JSON.stringify(initialData),
//   });
//   if (!res.ok) throw new Error(`Create failed: ${res.status}`);
//   const json = await res.json();
//   return json.metadata.id;  // the new bin's ID
// }


function App() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [newScore, setNewScore] = useState("");

  // -- Read on mount --
  useEffect(() => {
    readBin()
      .then(setScores)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // -- Add a score and save --
  async function handleAddScore(e: React.FormEvent) {
    e.preventDefault();
    if (!newName || !newScore) return;

    const entry: Score = {
      name: newName,
      score: Number(newScore),
      timestamp: new Date().toISOString(),
    };

    const updated = [...scores, entry];
    setSaving(true);
    setError(null);

    try {
      const saved = await writeBin(updated);
      setScores(saved);
      setNewName("");
      setNewScore("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  // ── Delete a score and save ──
  async function handleDelete(index: number) {
    const updated = scores.filter((_, i) => i !== index);
    setSaving(true);
    setError(null);
    try {
      const saved = await writeBin(updated);
      setScores(saved);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  // -- Clear all scores --
  async function handleClearAll() {
    if (!confirm("Clear all scores?")) return;
    setSaving(true);
    try {
      const saved = await writeBin([]);
      setScores(saved);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className={styles.loading}>Loading scores from JSONbin…</p>;

  // Sort highest score first
  const sorted = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Score Board</h1>
      <p className={styles.subtitle}>
        Updated scores are stored in JSONbin.io!
      </p>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleAddScore} className={styles.form}>
        <h2>Add New Score</h2>
        <div className={styles.row}>
          <input
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="number"
            placeholder="Score"
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
            className={styles.input}
            style={{ width: 100 }}
            required
          />
          <button type="submit" disabled={saving} className={styles.btnPrimary}>
            {saving ? "Saving…" : "Add"}
          </button>
        </div>
      </form>

      <h2>Scores ({sorted.length})</h2>
      {sorted.length === 0 ? (
        <p>No scores yet — add one above!</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>#</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Score</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, i) => {
              // find original index for deletion
              const origIdx = scores.indexOf(s);
              return (
                <tr key={i} className={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td className={styles.td}>{i + 1}</td>
                  <td className={styles.td}>{s.name}</td>
                  <td className={styles.td} style={{ fontWeight: "bold" }}>{s.score}</td>
                  <td className={styles.td}>{new Date(s.timestamp).toLocaleString()}</td>
                  <td className={styles.td}>
                    <button onClick={() => handleDelete(origIdx)} className={styles.btnDanger}>
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {sorted.length > 0 && (
        <button onClick={handleClearAll} disabled={saving} className={styles.btnDanger} style={{ marginTop: "1rem" }}>
          Clear All Scores
        </button>
      )}

      <details style={{ marginTop: "2rem" }}>
        <summary style={{ cursor: "pointer", color: "#555" }}>
          How to create a new bin programmatically
        </summary>
        <pre className={styles.code}>
          {`const newBinId = await createBin({ scores: [] });
// newBinId is the ID to use in VITE_BIN_ID`}
        </pre>
      </details>
    </div>
  );
}

export default App;


/* Ex 3 — Authentication Patterns


import "./App.css";
import { useState } from "react";

// -- A) API KEY 
// newsapi.org requires a free API key.
// Real usage: replace with import.meta.env.VITE_NEWS_API_KEY
const NEWS_API_KEY = "14aa972cbdd44d899ec36002594524d5"; // get at newsapi.org

function ApiKeyExample() {
  const [headline, setHeadline] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchNews() {
    setLoading(true);
    // The API key goes in a custom header: X-Api-Key
    const res = await fetch(
      "https://newsapi.org/v2/everything?q=technology&sortBy=publishedAt&pageSize=1",
      {
        headers: {
          "X-Api-Key": NEWS_API_KEY,
          // Some APIs accept it as a query param instead:
          // URL: ?apiKey=YOUR_KEY
        },
      }
    );
    const data = await res.json();
    setHeadline(data.articles?.[0]?.title ?? "No headline found");
    setLoading(false);
  }

  return (
    <section className="section" style={{ background: "lightblue" }}>
      <h2>A) API Key (newsapi.org)</h2>
      <p>
        API keys are static tokens that identify your application.
        Passed as a header (<code>X-Api-Key</code>) or query param.
      </p>
      <button onClick={fetchNews} disabled={loading}>
        {loading ? "Loading…" : "Fetch Top Headline"}
      </button>
      {headline && <p><strong>Headline:</strong> {headline}</p>}
      <pre className="code-block">
{`fetch("https://newsapi.org/v2/top-headlines?...", {
  headers: { "X-Api-Key": "your-api-key" }
})`}
      </pre>
    </section>
  );
}

// -- B) BEARER TOKEN (JWT) 
// reqres.in is a free fake REST API that used to return a token on login. This 
// doesn't work as is, but the example shows how you'd use that token in subsequent requests.
// In a real app you'd store this token in state (or httpOnly cookie) after login.

function BearerTokenExample() {
  const [token, setToken]   = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    // Step 1: POST credentials → receive a token
    const res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "email", password: "pwd" }),
    });
    const data = await res.json();
    setToken(data.token);
    setLoading(false);
  }

  async function fetchProfile() {
    if (!token) return;
    // Step 2: use the token in subsequent requests
    const res = await fetch("https://reqres.in/api/users/2", {
      headers: {
        "Authorization": `Bearer ${token}`, // standard header format
      },
    });
    const data = await res.json();
    setProfile(`${data.data.first_name} ${data.data.last_name} (${data.data.email})`);
  }

  return (
    <section className="section" style={{ background: "lightyellow" }}>
      <h2>B) Bearer Token / JWT (reqres.in)</h2>
      <p>
        Login once &gt; receive a token &gt; attach it to every subsequent request
        via the <code>Authorization: Bearer &lt;token&gt;</code> header.
      </p>
      <p> Full example in Cmpt 372 </p>
      <button onClick={login} disabled={loading || token !== null}>
        {loading ? "Logging in…" : token ? "Logged in ✓" : "Login"}
      </button>
      {token && (
        <>
          <p><strong>Token received:</strong> <code>{token}</code></p>
          <button onClick={fetchProfile}>Fetch Profile with Token</button>
        </>
      )}
      {profile && <p><strong>Profile:</strong> {profile}</p>}
      <pre className="code-block">
        {`// After login, use the token like this:
fetch("https://reqres.in/api/users/2", {
  headers: {
    "Authorization": \`Bearer \${token}\`
  }
})`

        }
      </pre>
    </section>
  );
}

// -- C) BASIC AUTH 
// httpbin.org/basic-auth/{user}/{pass} returns 200 only if you send
// the matching Basic Auth credentials.

function BasicAuthExample() {
  const [result, setResult] = useState<string | null>(null);

  async function fetchWithBasicAuth() {
    // assume this is the username & password we need to authenticate with
    const username = "bobby";
    const password = "secret123";

    // Basic auth = "username:password" encoded as base64
    const credentials = btoa(`${username}:${password}`);

    const res = await fetch(
      `https://httpbin.org/basic-auth/${username}/${password}`,
      {
        headers: {
          "Authorization": `Basic ${credentials}`,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      setResult(`Authenticated as: ${data.user}`);
    } else {
      setResult("Authentication failed");
    }
  }

  return (
    <section className="section" style={{ background: "#e8f5e9" }}>
      <h2>C) Basic Auth (httpbin.org)</h2>
      <p>
        Username and password are base64-encoded and sent in the{" "}
        <code>Authorization</code> header. Only safe over HTTPS!
      </p>
      <button onClick={fetchWithBasicAuth}>Try Basic Auth</button>
      {result && <p><strong>Result:</strong> {result}</p>}
      <pre className="code-block">
{`const credentials = btoa("username:password");

fetch("https://httpbin.org/basic-auth/user/pass", {
  headers: {
    "Authorization": \`Basic \${credentials}\`
  }
})`}
      </pre>
    </section>
  );
}


function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: 720 }}>
      <h1>Authentication Patterns</h1>
      <ApiKeyExample />
      <BearerTokenExample />
      <BasicAuthExample />
    </div>
  );
}

export default App;

 */