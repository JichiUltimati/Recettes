function getThisProject(tp) {
    const thisFolder = tp.file.folder(false)
    //const folders = tp.file.folder(true).split('/')
    // const parentFolder = folders[0]
    //if (parentFolder == "Name of folder") {
    //    return "Name of Folder";
    //}
    return thisFolder;
}
module.exports = getThisProject;