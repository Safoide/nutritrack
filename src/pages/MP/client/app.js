
const mp = new MercadoPago('APP_USR-6173f5f6-44b6-4045-80d4-892c82a52fba', {
    locale: "es-AR",
});

document.getElementById("checkout-btn").addEventListener("click", async () => {

    try {
        const orderData = {
            title: document.querySelector(".name").innerText,
            quantity: 1,
            price: 1,
        };


        const response = await fetch("http://localhost:3000/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });


        const preference = await response.json();
        createCheckoutButton(preference.id);

    } catch (error) {
        alert("error :(");
    }

});


const createCheckoutButton = (preferenceId) => {

    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {

        if (window.checkoutButton) window.checkoutButton.unmount();

        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            },
            customization: {
                texts: {
                    valueProp: 'smart_option',
                },
            },
        });

    };

    renderComponent();
};


