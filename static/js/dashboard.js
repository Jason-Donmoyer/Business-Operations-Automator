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
    const filename = checkedValue[0].value;
    fetch(`/report?file_name=${filename}`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) throw new Error('Upload failed');
        return response.json();
    })
    .then(data => {
        console.log(data);
        console.log(data.total_revenue);
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
        const productVolumeLabel = document.createElement('h5');
        productVolumeLabel.innerHTML = 'Product Volume';
        const productVolumeValues = document.createElement('div');
        Object.entries(data.product_volume).forEach(([name, volume]) => {
            const productContainer = document.createElement('div');
            const productName = document.createElement('h6');
            productName.innerHTML = name;
            const productValue = document.createElement('p');
            productValue.innerHTML = volume;
            productContainer.appendChild(productName);
            productContainer.appendChild(productValue);
            productVolumeValues.append(productContainer);
        });
        productVolumeContainer.appendChild(productVolumeLabel);
        productVolumeContainer.appendChild(productVolumeValues);
        // Add container for revenue by category
        const revenueByCategoryContainer = document.createElement('div');
        const revenueByCategoryLabel = document.createElement('h5');
        revenueByCategoryLabel.innerHTML = 'Revenue By Category';
        const revenueByCategoryValues = document.createElement('div');
        Object.entries(data.revenue_by_category).forEach(([category, revenue]) => {
            const categoryContainer = document.createElement('div');
            const categoryName = document.createElement('h6');
            categoryName.innerHTML = category;
            const categoryValue = document.createElement('p');
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
        // Add containers to reportFileContainer
        reportFileContainer.appendChild(reportFileName);
        reportFileContainer.appendChild(statsDiv);
        reportFileContainer.appendChild(productVolumeContainer);
        reportFileContainer.appendChild(revenueByCategoryContainer);
        // Add report file container to reports container
        reports.appendChild(reportFileContainer);
    });
});