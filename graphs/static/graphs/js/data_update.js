//display spinning loader when upload button is clicked
document.getElementById('upload').addEventListener("click", function () {
    document.getElementById('loading').style.display = "block";
});

csv_file = document.getElementById('csv_file');
upload = document.getElementById('upload');

// check to make sure that file is csv
csv_file.addEventListener("change", function () {
   let file = csv_file.files;
   let split = file[0].name.split('.');
   let file_type = split[1];
   upload.disabled = file_type !== 'csv';
});