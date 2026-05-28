const fileUpload = document.getElementById('file-upload');
const uploadStatus = document.getElementById('upload-status');
const uploads = document.getElementById('uploads');
const reports = document.getElementById('reports');
const getReport = document.getElementById('get-report');
const checkedStatus = document.getElementById('checked-status');
const companyName = document.getElementById('company-name');
const companyNameLabel = document.getElementById('company-name-label');
const companyNameInput = document.getElementById('company-name-input');
const setNameButton = document.getElementById('set-name-btn');
const changeNameButton = document.getElementById('change-name');
const scheduleButton = document.getElementById('schedule-btn');
const scheduleSuccessMessage = document.getElementById('scheduler-success');
const reportStore = {};
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const modalCloseButton = document.getElementById('modal-close');
const deleteAllReportsButton = document.getElementById('delete-all-reports-btn');
const deleteAllUploadsButton = document.getElementById('delete-all-uploads-btn');

function createReportLinks(filename, data) {
    modalContent.innerHTML = ''
    // const reportData = reportStore[e.target.innerHTML];
    // Create Modal Content
    const reportFileContainer = document.createElement('div')
    reportFileContainer.className = 'report-file-container';
    // Create Report File Name
    const reportFileName = document.createElement('h4');
    reportFileName.innerHTML = filename;
    // Create container for total revenue
    const totalRevenueContainer = document.createElement('div');
    totalRevenueContainer.className = 'total-card';
    const totalRevenueLabel = document.createElement('h5');
    totalRevenueLabel.innerHTML = 'Total Revenue: '
    const totalRevenueValue = document.createElement('p');
    totalRevenueValue.innerHTML = `$${data.total_revenue}`;
    totalRevenueContainer.appendChild(totalRevenueLabel);
    totalRevenueContainer.appendChild(totalRevenueValue);
    // Create container for total sales tax
    const totalSalesTaxContainer = document.createElement('div');
    totalSalesTaxContainer.className = 'total-card';
    const totalSalesTaxLabel = document.createElement('h5');
    totalSalesTaxLabel.innerHTML = 'Total Sales Tax: ';
    const totalSalesTaxValue = document.createElement('p');
    totalSalesTaxValue.innerHTML = `$${data.total_sales_tax}`;
    totalSalesTaxContainer.appendChild(totalSalesTaxLabel);
    totalSalesTaxContainer.appendChild(totalSalesTaxValue)
    // Create container for product volume
    const productVolumeContainer = document.createElement('div');
    productVolumeContainer.className = 'total-card';
    const productVolumeLabel = document.createElement('h5');
    productVolumeLabel.innerHTML = 'Product Volume';
    const productVolumeValues = document.createElement('div');
    productVolumeValues.className = 'products-wrapper';
    Object.entries(data.product_volume).forEach(([name, volume]) => {
        const productContainer = document.createElement('div');
        productContainer.className = 'product-item';
        const productName = document.createElement('span');
        productName.innerHTML = name;
        const productValue = document.createElement('span');
        productValue.innerHTML = volume;
        productContainer.appendChild(productName);
        productContainer.appendChild(productValue);
        productVolumeValues.append(productContainer);
    });
    productVolumeContainer.appendChild(productVolumeLabel);
    productVolumeContainer.appendChild(productVolumeValues);
    // Add container for revenue by category
    const revenueByCategoryContainer = document.createElement('div');
    revenueByCategoryContainer.className = 'total-card';
    const revenueByCategoryLabel = document.createElement('h5');
    revenueByCategoryLabel.innerHTML = 'Revenue By Category';
    const revenueByCategoryValues = document.createElement('div');
    revenueByCategoryValues.className = 'revenue-wrapper';
    Object.entries(data.revenue_by_category).forEach(([category, revenue]) => {
        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'category-item';
        const categoryName = document.createElement('span');
        categoryName.innerHTML = category;
        const categoryValue = document.createElement('span');
        categoryValue.innerHTML = revenue;
        categoryContainer.appendChild(categoryName);
        categoryContainer.appendChild(categoryValue);
        revenueByCategoryValues.appendChild(categoryContainer);
    });
    revenueByCategoryContainer.appendChild(revenueByCategoryLabel);
    revenueByCategoryContainer.appendChild(revenueByCategoryValues)
    // Create wrapper divs
    const statsDiv = document.createElement('div');
    statsDiv.className = 'stats-row';
    statsDiv.appendChild(totalRevenueContainer);
    statsDiv.appendChild(totalSalesTaxContainer);
    const productsDiv = document.createElement('div');
    productsDiv.className = 'products-row';
    productsDiv.appendChild(productVolumeContainer);
    productsDiv.appendChild(revenueByCategoryContainer);
    // Add containers to reportFileContainer
    reportFileContainer.appendChild(reportFileName);
    reportFileContainer.appendChild(statsDiv);
    reportFileContainer.appendChild(productsDiv);
    // Add report file container to reports container
    modalContent.appendChild(reportFileContainer);
    modalOverlay.style.display = 'flex';
}

// localstorage
if (localStorage.getItem('companyName')) {
    companyName.innerHTML = localStorage.getItem('companyName');
    companyNameLabel.style.display = 'none';
    companyNameInput.style.display = 'none';
    setNameButton.style.display = 'none';
    changeNameButton.style.display = 'inline';
}

if (localStorage.getItem('uploads')) {
    const savedUploads = JSON.parse(localStorage.getItem('uploads'));
    savedUploads.forEach(filename => {
        const uploadFileContainer = document.createElement('div');
        uploadFileContainer.className = 'upload-file-container';
        const uploadFile = document.createElement('p');
        uploadFile.className = 'upload-file';
        uploadFile.innerHTML = filename;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = filename;
        const deleteUploadButton = document.createElement('button');
        deleteUploadButton.innerHTML = 'Delete File';
        deleteUploadButton.className = 'delete-upload-btn';
        uploadFileContainer.appendChild(checkbox);
        uploadFileContainer.appendChild(uploadFile);
        uploadFileContainer.appendChild(deleteUploadButton);
        uploads.appendChild(uploadFileContainer);
        // Delete upload button
        deleteUploadButton.addEventListener('click', () => {
            if (!confirm('Are you sure you want to delete this file?')) return;
            uploadFileContainer.remove();
            const savedUploads = JSON.parse(localStorage.getItem('uploads'));
            const updatedUploads = savedUploads.filter(uploads => uploads !== filename);
            localStorage.setItem('uploads', JSON.stringify(updatedUploads));
        });
    });
}

if (localStorage.getItem('reports')) {
    const savedReports = JSON.parse(localStorage.getItem('reports'));
    Object.entries(savedReports).forEach(([filename, data]) => {
        reportStore[filename] = data;
        const reportLinkContainer = document.createElement('div');
        reportLinkContainer.className = 'report-link-container';
        const reportLink = document.createElement('a');
        reportLink.className = 'report-link';
        reportLink.innerHTML = filename;
        reportLinkContainer.appendChild(reportLink);
        reportLink.addEventListener('click', () => {
            createReportLinks(filename, data);
        });
        const deleteReportButton = document.createElement('button');
        deleteReportButton.innerHTML = 'Delete Report';
        deleteReportButton.className = 'delete-report-btn';
        reportLinkContainer.appendChild(deleteReportButton);
        reports.appendChild(reportLinkContainer);
        deleteReportButton.addEventListener('click', () => {
            if (!confirm("Are you sure you want to delete this report?")) return;
            reportLinkContainer.remove();
            const savedReports = JSON.parse(localStorage.getItem('reports'));
            delete savedReports[filename];
            localStorage.setItem('reports', JSON.stringify(savedReports));
            delete reportStore[filename];
        });
    });
}

if (localStorage.getItem('scheduler')) {
    document.getElementById('scheduler').value = localStorage.getItem('scheduler');
}


// Event listeners
setNameButton.addEventListener('click', () => {
    companyName.innerHTML = companyNameInput.value;
    companyNameLabel.style.display = 'none';
    companyNameInput.style.display = 'none';
    setNameButton.style.display = 'none';
    changeNameButton.style.display = 'inline';
    localStorage.setItem('companyName', companyNameInput.value);
});

changeNameButton.addEventListener('click', () => {
    companyName.innerHTML = 'Company Name';
    companyNameLabel.style.display = 'inline';
    companyNameInput.style.display = 'inline';
    setNameButton.style.display = 'inline-block';
    changeNameButton.style.display = 'none';
});

fileUpload.addEventListener('change', () => {
    if (!fileUpload.files[0]) {
        return;
    }
    const formData = new FormData();
    formData.append('file', fileUpload.files[0]);
    const filename = fileUpload.files[0].name;
    const savedUploads = JSON.parse(localStorage.getItem('uploads') || '[]');
        if (savedUploads.includes(filename)) {
            uploadStatus.style.display = 'inline-block';
            uploadStatus.innerHTML = 'File already uploaded.'
            uploadStatus.className = 'error';
            setTimeout(() => {
                uploadStatus.style.display = 'none';
                uploadStatus.innerHTML = '';
            }, 3000);
            return;
        }
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) throw new Error('Upload failed');
        return response.json();
    })
    .then(data => {
        console.log(data);
        // const savedUploads = JSON.parse(localStorage.getItem('uploads') || '[]');
        // if (savedUploads.includes(filename)) {
        //     uploadStatus.style.display = 'inline-block';
        //     uploadStatus.innerHTML = 'File already uploaded.'
        //     uploadStatus.className = 'error';
        //     setTimeout(() => {
        //         uploadStatus.style.display = 'none';
        //         uploadStatus.innerHTML = '';
        //     }, 3000);
        //     return;
        // }
        uploadStatus.style.display = 'inline-block';
        uploadStatus.innerHTML = 'upload successful!';
        uploadStatus.className = 'success';
        setTimeout(() => {
            uploadStatus.style.display = 'none';
        }, 3000);
        const uploadFileContainer = document.createElement('div');
        uploadFileContainer.className = 'upload-file-container';
        const uploadFile = document.createElement('p');
        uploadFile.className = 'upload-file';
        uploadFile.innerHTML = filename;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = filename;
        const deleteUploadButton = document.createElement('button');
        deleteUploadButton.innerHTML = 'Delete File';
        deleteUploadButton.className = 'delete-upload-btn';
        uploadFileContainer.appendChild(checkbox);
        uploadFileContainer.appendChild(uploadFile);
        uploadFileContainer.appendChild(deleteUploadButton);
        uploads.appendChild(uploadFileContainer);
        savedUploads.push(filename);
        localStorage.setItem('uploads', JSON.stringify(savedUploads));
        // Delete upload button
        deleteUploadButton.addEventListener('click', () => {
            if (!confirm('Are you sure you want to delete this file?')) return;
            uploadFileContainer.remove();
            const savedUploads = JSON.parse(localStorage.getItem('uploads'));
            // console.log(typeof savedUploads, savedUploads);
            const updatedUploads = savedUploads.filter(uploads => uploads !== filename);
            localStorage.setItem('uploads', JSON.stringify(updatedUploads));
        });
    })
    .catch(error => {
        uploadStatus.style.display = 'inline-block';
        uploadStatus.innerHTML = 'upload failed';
        uploadStatus.className = 'error';
    });
    fileUpload.value = '';
});

getReport.addEventListener('click', () => {
    const checkedValue = document.querySelectorAll('input[type="checkbox"]:checked');
    // const filename = checkedValue[0].value;
    // Check if any checkboxes are checked
    if (checkedValue.length === 0) {
        checkedStatus.style.display = 'inline-block';
        checkedStatus.innerHTML = 'Please select a file to generate report.';
        setTimeout(() => {
            checkedStatus.style.display = 'none';
            checkedStatus.innerHTML = '';
        }, 3000);
        return;
    }
    checkedValue.forEach(checkbox => {
        const filename = checkbox.value;
        // Check if report already exists
        if (reportStore[filename]) {
            checkedStatus.style.display = 'inline-block';
            checkedStatus.innerHTML = `Report for ${filename} has already been generated.`;
            setTimeout(() => {
                checkedStatus.style.display = 'none';
                checkedStatus.innerHTML = '';
            }, 3000);
            return;
        }
        reportStore[filename] = true;
        fetch(`/report?file_name=${filename}`, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) throw new Error('Upload failed');
            return response.json();
        })
        .then(data => {
            console.log(data);
            const reportLinkContainer = document.createElement('div');
            reportLinkContainer.className = 'report-link-container';
            const reportLink = document.createElement('a');
            reportLink.className = 'report-link';
            reportLink.innerHTML = filename;
            reportStore[filename] = data;
            localStorage.setItem('reports', JSON.stringify(reportStore));
            const deleteReportButton = document.createElement('button');
            deleteReportButton.innerHTML = 'Delete Report';
            deleteReportButton.className = 'delete-report-btn';
            reportLinkContainer.appendChild(reportLink);
            reportLinkContainer.appendChild(deleteReportButton);
            reports.appendChild(reportLinkContainer);
            reportLink.addEventListener('click', (e) => {
                createReportLinks(filename, data);
            });
            deleteReportButton.addEventListener('click', () => {
                if (!confirm("Are you sure you want to delete this report?")) return;
                reportLinkContainer.remove();
                const savedReports = JSON.parse(localStorage.getItem('reports'));
                delete savedReports[filename];
                localStorage.setItem('reports', JSON.stringify(savedReports));
                delete reportStore[filename];
            });   
        });
    });
});

// Delete all buttons
deleteAllUploadsButton.addEventListener('click', () => {
    if (!uploads.hasChildNodes()) return;
    if (!confirm("Are you sure you want to delete all uploads?")) return;
    uploads.innerHTML = '';
    localStorage.removeItem('uploads');
});

deleteAllReportsButton.addEventListener('click', () => {
    if (!reports.hasChildNodes()) return;
    if (!confirm("Are you sure you want to delete all reports?")) return;
    reports.innerHTML = '';
    Object.keys(reportStore).forEach(key => delete reportStore[key]);
    localStorage.removeItem('reports');
});

// Set Schedule Event Listener
scheduleButton.addEventListener('click', () => {
    const scheduler = document.getElementById('scheduler');
    const schedule_value = scheduler.value;
    if (!schedule_value) {
        scheduleSuccessMessage.innerHTML = 'Please select a schedule interval.';
        scheduleSuccessMessage.className= 'error';
        scheduleSuccessMessage.style.display = 'inline-block';
        setTimeout(() => {
            scheduleSuccessMessage.style.display = 'none';
        }, 3000);
        return;
    }
    localStorage.setItem('scheduler', schedule_value);
    const url = `/schedule?interval_value=${schedule_value}`;
    fetch(url, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) throw new Error('Upload failed');
        return response.json();
    })
    .then(data => {
        scheduleSuccessMessage.style.display = 'inline-block';
        setTimeout(() => {
            scheduleSuccessMessage.style.display = 'none';
        }, 3000);
        console.log(data);
    });
});


// Close modal button
modalCloseButton.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

// if (reports.hasChildNodes()) {
//     const deleteAllReportsButton = document.createElement('button');
//     deleteAllReportsButton.innerHTML = 'Delete All';
//     deleteAllReportsButton.className = 'delete-all-btn';
//     reports.appendChild(deleteAllReportsButton);
// } 

