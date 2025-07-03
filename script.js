document.getElementById('square-feet').addEventListener('input', function() {
    document.getElementById('square-feet-value').textContent = this.value + ' sqft';
});

document.getElementById('location').addEventListener('input', function() {
    document.getElementById('location-value').textContent = this.value;
});

// Property calculator logic
document.getElementById('calculate-btn').addEventListener('click', function(e) {
    e.preventDefault();

    // Get form values
    const propertyType = document.getElementById('property-type').value;
    const squareFeet = parseInt(document.getElementById('square-feet').value);
    const bedrooms = parseInt(document.querySelector('input[name="bedrooms"]:checked').value);
    const locationScore = parseInt(document.getElementById('location').value);

    // Check selected features
    const hasPool = document.querySelector('input[value="pool"]').checked;
    const hasView = document.querySelector('input[value="view"]').checked;
    const hasGarage = document.querySelector('input[value="garage"]').checked;
    const isRenovated = document.querySelector('input[value="renovated"]').checked;

    // Base price based on property type
    let basePrice;
    switch (propertyType) {
        case 'single-family':
            basePrice = 300000;
            break;
        case 'condo':
            basePrice = 250000;
            break;
        case 'townhouse':
            basePrice = 275000;
            break;
        case 'multifamily':
            basePrice = 400000;
            break;
        case 'commercial':
            basePrice = 500000;
            break;
        default:
            basePrice = 300000;
    }

    // Adjust for square footage
    const pricePerSqFt = bedrooms > 3 ? 120 : 150;
    const sqFtAdjustment = (squareFeet - 1500) * pricePerSqFt;

    // Adjust for bedrooms
    const bedroomAdjustment = bedrooms * 15000;

    // Calculate location multiplier (0.8 to 1.2)
    const locationMultiplier = 0.8 + (locationScore * 0.04);

    // Calculate features bonus
    let featuresBonus = 0;
    if (hasPool) featuresBonus += 25000;
    if (hasView) featuresBonus += 15000;
    if (hasGarage) featuresBonus += 20000;
    if (isRenovated) featuresBonus += 30000;

    // Calculate final price
    const calculatedPrice = (basePrice + sqFtAdjustment + bedroomAdjustment + featuresBonus) * locationMultiplier;

    // Display result
    document.getElementById('property-value').textContent = '$' + Math.round(calculatedPrice).toLocaleString();
    document.getElementById('result').classList.remove('hidden');

    // Smooth scroll to result
    document.getElementById('result').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // In a real implementation, you would send this data to your server
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Show confirmation
    alert(`Thank you ${name}! We've received your inquiry and will contact you at ${email} shortly.`);

    // Reset form
    this.reset();
});