const input = document.querySelector('input[type="file"]')
input.addEventListener('change', async () =>  {
    console.log(input.files)
    
    // let response = await fetch("/", {
    //     method: 'POST',
    //     body: new FormData()
    // });

}, false)
