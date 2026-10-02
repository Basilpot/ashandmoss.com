<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Tenancy

Every tenant is a **store**. The API resolves the store per request from the
inbound host (`X-Store-Host`, or `x-forwarded-host`/`Origin`/`Referer`) matched
against `store_domain`, so **every** fetch through `src/lib/api.ts` must carry
the tenant host or it will silently land in the default store. Server-rendered
callers pass `await getStoreHost()`; client-side calls get it for free from
`window.location.host` inside `tenantFetch`. `app/layout.tsx` resolves the store
and picks a template from `store.templateKey`.

Run against the live API to exercise a non-default tenant — locally every host
resolves to `DEFAULT_STORE_SLUG`.
