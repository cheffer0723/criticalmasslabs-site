# Critical Mass Labs

Static public site for [criticalmasslabs.xyz](https://criticalmasslabs.xyz), built for GitHub Pages.

## Local preview

Serve this directory with any static HTTP server, for example:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

GitHub Pages serves the root of the `main` branch. The `CNAME` file requests the `criticalmasslabs.xyz` custom domain; DNS must point the domain to GitHub Pages before the custom domain will resolve.
