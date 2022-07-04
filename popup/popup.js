

function copyPath(path) {
  if (path) {
    navigator.clipboard.writeText(path.join(', '))
  }
}

function populateList(path) {
  if (!path) return;

  const list = document.getElementById('tab-list');

  // Clear current list
  while (list.lastElementChild) {
    list.removeChild(list.lastElementChild);
  }

  for (let url of path) {
    const list = document.createElement('li');
    const a = document.createElement('a');

    a.href = url;
    a.innerText = url.split('/').pop().replace(/\_/g, ' ');
    li.appendChild(a);
    list.appendChild(li);
  }
}

async function main() {
  const [active] = await browser.tabs.query({ active: true });
  const { live_index } = await browser.storage.local.get();

  path = live_index[active.id];

  browser.onChanged.addListener()

  const copyPathBtn = document.getElementById('copy-path');
  copyPathBtn.onclick = () => copyPath(path)

  const newRunBtn = document.getElementById('new-run');
  newRunBtn.onclick = async () => {
    browser.runtime.sendMessage(null, 'clear-path', { tabId: active.id })
  }
}
main();