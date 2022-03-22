const emailReceiver = 'hafidhrzk@gmail.com'

function submitForm() {
    let name = document.getElementById('input-name').value
    let email = document.getElementById('input-email').value
    let number = document.getElementById('input-phone').value
    let subject = document.getElementById('select-subject').value
    let message = document.getElementById('input-message').value

    if(name == '') {
        alert('Nama harus diisi')
    }
    if(email == ''){
        alert('Email harus diisi')
    }
    if(number == ''){
        alert('Nomor handphone harus diisi')
    }
    if(subject == ''){
        alert('Subject harus diisi')
    }
    if(message == ''){
        alert('Pesan harus diisi')
    }

    let a = document.createElement('a')
    a.href = `mailto:${emailReceiver}?subject=${subject}&body=Hello my name ${name}, ${message}`
    a.click()
}