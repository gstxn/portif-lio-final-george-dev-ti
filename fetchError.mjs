async function fetchError() {
  try {
    const res = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({messages: [{role: 'user', content: 'hi'}]}),
      headers: { 'Content-Type': 'application/json' }
    });
    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("BODY:", text);
  } catch(e) {
    console.error("FETCH ERROR:", e);
  }
}
fetchError();
