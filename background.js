let counts = {}

function updateCounts(tabId, { url }) {
  if (tabId in counts) {
    const visited = counts[tabId];

    if (visited[visited.length - 1] === url) return; // Refresh
    if (visited[visited.length - 2] === url) counts[tabId] = visited.slice(0, -2); // Go back

    counts[tabId].push(url)
  } else {
    counts[tabId] = [url];
  }
  browser.storage.local.set({ 'live_index': counts });
  browser.browserAction.setBadgeText({ text: counts[tabId].length.toString(), tabId })
}

async function main() {
  const { live_index } = await browser.storage.local.get();
  if (!!live_index) counts = live_index

  const tabs = await browser.tabs.query({});

  for (let tab of tabs) {
    if (tab.url.startsWith('https://starwars.fandom.com')) {
      counts[tab.id] = [tab.url]
      browser.browserAction.setBadgeText({
        text: counts[tab.id].length.toString(),
        tabId: tab.id
      });
    }
  }
  browser.tabs.onUpdated.addListener(updateCounts,
    {
      urls: ['https://starwars.fandom.com/*'],
      properties: ['url']
    })
  // browser.storage.onChanged.addListener(async (change) => {
  //   const [active] = await browser.tabs.query({ active: true });
  //   const { live_index } = change;
  //   browser.browserAction.setBadgeText({
  //     text: 
  //   })
  // })
}
//https://starwars.fandom.com/wiki/Jar_Jar_Binks



main()