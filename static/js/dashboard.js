const fileUpload = document.getElementById('file-upload');
const uploadStatus = document.getElementById('upload-status');
const uploads = document.getElementById('uploads');
const reports = document.getElementById('reports');
const getReport = document.getElementById('get-report');
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

setNameButton.addEventListener('click', () => {
    companyName.innerHTML = companyNameInput.value;
    companyNameLabel.style.display = 'none';
    companyNameInput.style.display = 'none';
    setNameButton.style.display = 'none';
    changeNameButton.style.display = 'inline';
});

changeNameButton.addEventListener('click', () => {
    companyName.innerHTML = 'Company Name';
    companyNameLabel.style.display = 'inline';
    companyNameInput.style.display = 'inline';
    setNameButton.style.display = 'inline-block';
    changeNameButton.style.display = 'none';
});

fileUpload.addEventListener('change', () => {
    const formData = new FormData();
    formData.append('file', fileUpload.files[0]);
    const filename = fileUpload.files[0].name;
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
        uploadStatus.style.display = 'inline-block';
        uploadStatus.innerHTML = 'upload successful!';
        uploadStatus.className = 'success';
        const uploadFileContainer = document.createElement('div');
        uploadFileContainer.className = 'upload-file-container';
        const uploadFile = document.createElement('p');
        uploadFile.className = 'upload-file';
        uploadFile.innerHTML = filename;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = filename;
        uploadFileContainer.appendChild(checkbox);
        uploadFileContainer.appendChild(uploadFile);
        uploads.appendChild(uploadFileContainer);
    })
    .catch(error => {
        uploadStatus.style.display = 'inline-block';
        uploadStatus.innerHTML = 'upload failed';
        uploadStatus.className = 'error';
    });
});

getReport.addEventListener('click', () => {
    const checkedValue = document.querySelectorAll('input[type="checkbox"]:checked');
    // const filename = checkedValue[0].value;
    checkedValue.forEach(checkbox => {
        const filename = checkbox.value;
        fetch(`/report?file_name=${filename}`, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) throw new Error('Upload failed');
            return response.json();
        })
        .then(data => {
            console.log(data);
            const reportLink = document.createElement('a');
            reportLink.className = 'report-link';
            reportLink.innerHTML = filename;
            reportStore[filename] = data;
            reports.appendChild(reportLink);
            reportLink.addEventListener('click', (e) => {
                modalContent.innerHTML = ''
                const reportData = reportStore[e.target.innerHTML];
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
                totalRevenueValue.innerHTML = `$${reportData.total_revenue}`;
                totalRevenueContainer.appendChild(totalRevenueLabel);
                totalRevenueContainer.appendChild(totalRevenueValue);
                // Create container for total sales tax
                const totalSalesTaxContainer = document.createElement('div');
                totalSalesTaxContainer.className = 'total-card';
                const totalSalesTaxLabel = document.createElement('h5');
                totalSalesTaxLabel.innerHTML = 'Total Sales Tax: ';
                const totalSalesTaxValue = document.createElement('p');
                totalSalesTaxValue.innerHTML = `$${reportData.total_sales_tax}`;
                totalSalesTaxContainer.appendChild(totalSalesTaxLabel);
                totalSalesTaxContainer.appendChild(totalSalesTaxValue)
                // Create container for product volume
                const productVolumeContainer = document.createElement('div');
                productVolumeContainer.className = 'total-card';
                const productVolumeLabel = document.createElement('h5');
                productVolumeLabel.innerHTML = 'Product Volume';
                const productVolumeValues = document.createElement('div');
                productVolumeValues.className = 'products-wrapper';
                Object.entries(reportData.product_volume).forEach(([name, volume]) => {
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
                Object.entries(reportData.revenue_by_category).forEach(([category, revenue]) => {
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
            });
        });
    });
});


// Set Schedule Event Listener
scheduleButton.addEventListener('click', () => {
    let scheduler = document.getElementById('scheduler');
    let schedule_value = scheduler.value;
    let url = `/schedule?interval_value=${schedule_value}`;
    fetch(url, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) throw new Error('Upload failed');
        return response.json();
    })
    .then(data => {
        scheduleSuccessMessage.style.display = 'inline-block';
        console.log(data);
    });
});



modalCloseButton.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

