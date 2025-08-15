document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        document.body.classList.add('loading');

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            // redirect to thank you page after successful submission
            window.location.href = form.querySelector('input[name="_next"]').value;
        }).catch(error => {
            console.error('Error:', error);
            document.body.classList.remove('loading');
            alert('There was an error sending your message. Please try again.');
        });
    });
});
