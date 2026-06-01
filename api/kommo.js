export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { return res.status(405).json({ error: 'Method Not Allowed' }); }

  try {
    const data = req.body;

    // Build tags
    const tags = [];
    if (data.tag) tags.push({ "name": data.tag });
    if (data.purpose) tags.push({ "name": data.purpose });

    const kommoPayload = [{
      "name": `Lead Marbella (${data.tag}) - ${data.name}`,
      "pipeline_id": 13739880,

      "_embedded": {
        "tags": tags.length > 0 ? tags : undefined,
        "contacts": [{
          "name": data.name,
          "custom_fields_values": [
            { "field_code": "EMAIL", "values": [{ "value": data.email }] },
            { "field_code": "PHONE", "values": [{ "value": data.phone || "Not provided" }] }
          ]
        }]
      }
    }];

    const kommoResponse = await fetch('https://pedropablocastro1995.kommo.com/api/v4/leads/complex', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJhMTc1YjFlY2RjMGRhZGE1OGNjNTNiNTFhMDBlYjIyMzk4YmI0NDA3NjQwM2M4MTEzZDU5OTE3NWE5ZWJjYjZlMzQ3N2ZlMmVlOWJmOTRmIn0.eyJhdWQiOiIzOWU2YmMzMS1mMmJhLTRhMmUtOGRjMC1kZjBjMWUxNTQ0ZTUiLCJqdGkiOiJiYTE3NWIxZWNkYzBkYWRhNThjYzUzYjUxYTAwZWIyMjM5OGJiNDQwNzY0MDNjODExM2Q1OTkxNzVhOWViY2I2ZTM0NzdmZTJlZTliZjk0ZiIsImlhdCI6MTc3Mzc2NDMxMiwibmJmIjoxNzczNzY0MzEyLCJleHAiOjE5MDY0MTYwMDAsInN1YiI6IjE0OTE2Mzk1IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjM2MTczNzExLCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMzI5ODlhYTAtZWRlNC00ZGY5LThlMDQtNzZiMDQzMzUwYTU4IiwiYXBpX2RvbWFpbiI6ImFwaS1jLmtvbW1vLmNvbSJ9.n-ESKadlEYmJy45zaDyDgTRv3w1FN1zwRihWf_90o6om7d-7Y7YrsyX5X4kkHRNQaoB4fw_XHu4P40S-Ayouxe7zcaqAPklSL8BNMNGB6gxpQ2TGgoJ560Rcdxc0404NEgL2ntITbEYGUHt9jGyf_PByhStZakiYHkcDX1KSrygwQk-X3dk3p7aWoL2nerZIITbHAIGBgHr5n9uCQgJHADczEsuek4_-u8hevgzpDXajGzsXy59KUpzxHgKvj0AyXHS-vku7yWp9v5rmAx-V8fa5I-Frui80Nqwn8mb2I5KZTOuJ67LIzEibTy0izpQNPtK7HQPawPGGCjUUK3IAcw`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(kommoPayload)
    });

    if (kommoResponse.ok || kommoResponse.status === 200 || kommoResponse.status === 201) {
      // Add a note with lead details
      try {
        const kommoData = await kommoResponse.json();
        const leadId = kommoData?.[0]?.id;
        if (leadId) {
          const noteLines = [];
          noteLines.push(`🏷️ Tipo: ${data.tag}`);
          if (data.purpose) noteLines.push(`🎯 Objetivo: ${data.purpose}`);
          if (data.type) noteLines.push(`📋 Formulario: ${data.type}`);
          const notePayload = [{ "note_type": "common", "params": { "text": noteLines.join('\n') } }];
          await fetch(`https://pedropablocastro1995.kommo.com/api/v4/leads/${leadId}/notes`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJhMTc1YjFlY2RjMGRhZGE1OGNjNTNiNTFhMDBlYjIyMzk4YmI0NDA3NjQwM2M4MTEzZDU5OTE3NWE5ZWJjYjZlMzQ3N2ZlMmVlOWJmOTRmIn0.eyJhdWQiOiIzOWU2YmMzMS1mMmJhLTRhMmUtOGRjMC1kZjBjMWUxNTQ0ZTUiLCJqdGkiOiJiYTE3NWIxZWNkYzBkYWRhNThjYzUzYjUxYTAwZWIyMjM5OGJiNDQwNzY0MDNjODExM2Q1OTkxNzVhOWViY2I2ZTM0NzdmZTJlZTliZjk0ZiIsImlhdCI6MTc3Mzc2NDMxMiwibmJmIjoxNzczNzY0MzEyLCJleHAiOjE5MDY0MTYwMDAsInN1YiI6IjE0OTE2Mzk1IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjM2MTczNzExLCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMzI5ODlhYTAtZWRlNC00ZGY5LThlMDQtNzZiMDQzMzUwYTU4IiwiYXBpX2RvbWFpbiI6ImFwaS1jLmtvbW1vLmNvbSJ9.n-ESKadlEYmJy45zaDyDgTRv3w1FN1zwRihWf_90o6om7d-7Y7YrsyX5X4kkHRNQaoB4fw_XHu4P40S-Ayouxe7zcaqAPklSL8BNMNGB6gxpQ2TGgoJ560Rcdxc0404NEgL2ntITbEYGUHt9jGyf_PByhStZakiYHkcDX1KSrygwQk-X3dk3p7aWoL2nerZIITbHAIGBgHr5n9uCQgJHADczEsuek4_-u8hevgzpDXajGzsXy59KUpzxHgKvj0AyXHS-vku7yWp9v5rmAx-V8fa5I-Frui80Nqwn8mb2I5KZTOuJ67LIzEibTy0izpQNPtK7HQPawPGGCjUUK3IAcw`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(notePayload)
          }).catch(err => console.error('Note warning:', err));
        }
      } catch (noteErr) { console.error('Note warning:', noteErr); }
      return res.status(200).json({ success: true });
    } else {
      const errText = await kommoResponse.text();
      console.error("Kommo API Error:", errText);
      return res.status(kommoResponse.status).json({ error: 'CRM Error', details: errText });
    }
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
