let signIn = document.querySelector('form.signin')
let signUp = document.querySelector('form.signup')
let signInBtn = document.querySelector('form.signin>button')
let signUpBtn = document.querySelector('form.signup>button')
let signInEmail = document.querySelector('form.signin>.email')
let signInPass = document.querySelector('form.signin>.pass')
let signUpName = document.querySelector('form.signup>.name')
let signUpEmail = document.querySelector('form.signup>.email')
let signUpPass = document.querySelector('form.signup>.pass')
let overlay = document.querySelector('.overlay')
let changeBtn = document.querySelector('.change_form')

let users = JSON.parse(localStorage.getItem('users'))?JSON.parse(localStorage.getItem('users')):[]

changeBtn.addEventListener('click', () => {
  overlay.classList.toggle('active')
  signIn.classList.toggle('active')
  signUp.classList.toggle('active')
})

function checkInp(element) {
  let elementAtt = element.getAttribute('type')
  if (elementAtt == 'text') {
    element.setAttribute('required','')
    let nameError = document.querySelector('.name_up')
    if(element.value.length > 3) {
      element.style.outlineColor = 'var(--success)'
      nameError.style.visibility = 'hidden'
    }else if(element.value.match(/^[0-9]$/)) {
      nameError.style.visibility = 'visible'
      nameError.textContent = 'Numbers cannot be entered! '
    }else if(element.value.length <= 3) {
      element.style.outlineColor = 'var(--alert)'
      nameError.style.visibility = 'visible'
      nameError.textContent = 'Name must not be less than 3 letters! '
    }else {
      element.style.outlineColor = 'var(--primary)'
    }
    return true
  } else if (elementAtt == 'email') {
    element.setAttribute('required', '')
    let emailError = document.querySelector('.email_up')
    if (element.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      element.style.outlineColor = 'var(--success)'
      emailError.style.visibility = 'hidden'
    } else if(!element.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      element.style.outlineColor = 'var(--alert)'
      emailError.style.visibility = 'visible'
      emailError.textContent = 'You have entered invalid e-mail address!'
    }else {
      element.style.outlineColor = 'var(--primary)'
    }
    return true
  } else if (elementAtt == 'password') {
    element.setAttribute('required', '')
    let passError = document.querySelector('.pass_up')
    if (element.value.match(/^([^A-Za-z0-9])(?=.{8,})$/)) {
      element.style.outlineColor = 'var(--success)'
      passError.style.visibility = 'hidden'
      return true
    } else if(!element.value.match(/^([^A-Za-z0-9])(?=.{8,})$/)) {
      element.style.outlineColor = 'var(--alert)'
      passError.style.visibility = 'visible'
      passError.textContent = 'The password is not valid! Try again'
      return false
    } else {
      element.style.outlineColor = 'var(--primary)'
    }
    return true
  }
}

function checkInpIn (elem) {
  let elementAtt = elem.getAttribute('type')
  if(elementAtt == 'email') {
    elem.setAttribute('required', '')
    let inEmailErr = document.querySelector('.email_in')
    if (elem.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      elem.style.outlineColor = 'var(--success)'
      inEmailErr.style.visibility = 'hidden'
    } else if(!elem.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      elem.style.outlineColor = 'var(--alert)'
      inEmailErr.style.visibility = 'visible'
      inEmailErr.textContent = 'Invalid e-mail address!'
    }else {
      elem.style.outlineColor = 'var(--primary)'
    }
    return true
  } else if (elementAtt == 'password') {
    elem.setAttribute('required', '')
    let passErrorIn = document.querySelector('.pass_in')
    if (elem.value.match(/^([^A-Za-z0-9])(?=.{8,})$/)) {
      elem.style.outlineColor = 'var(--success)'
      passErrorIn.style.visibility = 'hidden'
      return true
    } else if(!elem.value.match(/^([^A-Za-z0-9])(?=.{8,})$/)) {
      elem.style.outlineColor = 'var(--alert)'
      passErrorIn.style.visibility = 'visible'
      passErrorIn.textContent = 'Wrong password! Try again'
      return false
    } else {
      elem.style.outlineColor = 'var(--primary)'
    }
    return true
  }
}

signInBtn.addEventListener('click', (e) => {
  e.preventDefault()
  let checkStatus = false
  let firstName
  if (checkInpIn(signInEmail) && checkInpIn(signInPass)) {
    users.forEach(data => {
      if (signInEmail.value == data.email && signInPass.value == data.pass) {
        checkStatus = true
        firstName = data.name
      }
    });
    checkStatus?document.write(`Salom ${firstName}. Saytimizga Xush Kelibsiz`):console.log('Xatolik')
  }
})
signUpBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (checkInp(signUpName) && checkInp(signUpEmail) && checkInp(signUpPass)) {
    users.push({name: signUpName.value,email: signUpEmail.value,pass: signUpPass.value})
    localStorage.setItem('users', JSON.stringify(users))
    alert('Success')
  } else {
    alert('Error')
  }
})