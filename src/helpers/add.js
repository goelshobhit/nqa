export function addEntry(data) {
    // Parse any JSON previously stored in allEntries
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if(existingEntries == null) existingEntries = [];
    var entry = data;
    localStorage.setItem("entry", JSON.stringify(entry));
    // Save allEntries back to local storage
    existingEntries.push(entry);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    window.location.reload();
};

export function removeEntry(data) {
    // Parse any JSON previously stored in allEntries
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));

    existingEntries = existingEntries.filter((item) => item.id !== data.id);

    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
    window.location.reload();
};

export function isItemFav(data) {
    var existingEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
    const existingEntriesId = existingEntries.map(item => item.id);
    return existingEntriesId.includes(data);
}