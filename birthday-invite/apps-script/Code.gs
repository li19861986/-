// Kidos invitation RSVP backend (Google Apps Script).
// Setup: see ../README.md. Store the admin key in Project Settings > Script properties as ADMIN_KEY.

const SHEET_NAME = 'Responses';
const HEADERS = ['time', 'name', 'attending', 'adults', 'children'];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Guests send their RSVP here as a text/plain JSON body (no admin key needed).
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name = String(data.name || '').trim().slice(0, 60);
    if (!name) return json_({ ok: false, error: 'missing name' });
    getSheet_().appendRow([
      new Date(),
      name,
      data.attending === 'no' ? 'no' : 'yes',
      Math.max(0, Math.min(30, Number(data.adults) || 0)),
      Math.max(0, Math.min(40, Number(data.children) || 0))
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'bad request' });
  }
}

// The builder reads all responses with the admin key: ?key=...
function doGet(e) {
  const expected = PropertiesService.getScriptProperties().getProperty('ADMIN_KEY');
  if (!expected || (e.parameter.key || '') !== expected) {
    return json_({ ok: false, error: 'אין הרשאה: בדקו את המפתח' });
  }
  const rows = getSheet_().getDataRange().getValues().slice(1);
  const items = rows
    .filter(r => r[1])
    .map(r => ({ time: r[0], name: String(r[1]), attending: String(r[2]), adults: Number(r[3]) || 0, children: Number(r[4]) || 0 }));
  return json_({ ok: true, items: items });
}
