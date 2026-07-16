async function fetchOk() {
  try {
    const res = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({messages: [{role: 'user', content: 'hi'}]}),
      headers: { 'Content-Type': 'application/json' }
    });
    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("BODY START:", text.substring(0, 500));
  } catch(e) {
    console.error("FETCH ERROR:", e);
  }
}
fetchOk();
