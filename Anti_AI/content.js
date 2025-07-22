chrome.storage.sync.get({ enabled: true }).then(({ enabled }) => {
  if (!enabled) return;
  const url = new URL(location.href);
  if (
    url.hostname.match(/^([a-z0-9-]+\.)*google\.[a-z]+$/) &&
    url.pathname === "/search" &&
    url.searchParams.has("q") &&
    url.searchParams.get("udm") !== "14"
  ) {
    url.searchParams.set("udm", "14");
    location.replace(url.toString());
    return;
  }
  document.querySelectorAll('form[action="/search"]').forEach(form => {
    if (!form.querySelector('input[name="udm"]')) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "udm";
      input.value = "14";
      form.appendChild(input);
    }
  });
});
