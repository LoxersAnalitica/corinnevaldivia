import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Local dev Kommo API proxy
const kommoApiPlugin = () => ({
  name: 'kommo-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/kommo' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const tags = [];
            if (data.tag) tags.push({ "name": data.tag });
            if (data.purpose) tags.push({ "name": data.purpose });

            const kommoPayload = [{
              "name": `Lead Marbella (${data.tag}) - ${data.name}`,
              "pipeline_id": 13739880,
              "status_id": 103034083,
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

            if (kommoResponse.ok) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } else {
              const errText = await kommoResponse.text();
              console.error("Kommo Error:", errText);
              res.statusCode = kommoResponse.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'CRM Error' }));
            }
          } catch (err) {
            console.error("Dev Server Error:", err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal error' }));
          }
        });
      } else {
        next();
      }
    });
  }
});

export default defineConfig({
  plugins: [react(), kommoApiPlugin()],
})
