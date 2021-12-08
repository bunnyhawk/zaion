function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('file-upload.html').setTitle("Google File Upload for Zaion");
}

function uploadFileToGoogleDrive(data, file, name, email, description) {
  try {
    const receivingFolder = "Received Files";
    let folder, folders = DriveApp.getFoldersByName(receivingFolder);

    folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(receivingFolder);

    const contentType = data.substring(5, data.indexOf(';'));
    const bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,') + 7));
    const blob = Utilities.newBlob(bytes, contentType, file);
    const descriptionBlob = Utilities.newBlob(description, 'text/plain;charset=utf-8', 'description.txt');
    const folderName = [name, email].join(" ");
    file = folder.createFolder(folderName).createFile(descriptionBlob);
    file = DriveApp.getFoldersByName(folderName).next().createFile(blob);

    return "OK";

  } catch (f) {
    return f.toString();
  }

}