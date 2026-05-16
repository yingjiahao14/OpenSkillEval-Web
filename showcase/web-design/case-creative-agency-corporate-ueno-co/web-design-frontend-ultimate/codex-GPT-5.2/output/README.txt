Volta Studio — Static Site

Open `output/index.html` directly, or run a simple local server.

Note:
- The shared header/footer are injected at runtime from `output/_partials/*`.
- Some browsers restrict `file://` includes. If you see missing navigation,
  run a local server from `/app/output`:

  python3 -m http.server 8080

Then open http://localhost:8080/

