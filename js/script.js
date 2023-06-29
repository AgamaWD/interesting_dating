document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    phoneMaskInit(form);
    validation(form);
})

/*маска телефона*/
function phoneMaskInit(form) {
    let phone = form.querySelector('input[name="phone"]');
    ['input', 'focus', 'blur'].forEach(eventName => {
        phone.addEventListener(eventName, mask);
    })

    function mask(event) {
        let matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
        if (def.length >= val.length) val = def;
        this.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
        if (event.type == "blur") {
            if (this.value.length == 2) this.value = ""
        }
    };
};

/*Валидация формы*/

function validation(form) {
    const submitBtn =  form.querySelector('.form__btn[type="submit"]');
    const phone = form.querySelector('[name="phone"]');
    const phoneError = form.querySelector('[name="phone"] + span.error');
    const phoneErrorText = "Введите номер телефона  формате +7 (XXX) XXX-XX-XX.";

    const validatedFields = [
        [phone, phoneError, phoneErrorText],
    ]

    validatedFields.forEach(field => {
        field[0].addEventListener('change', function (event) {

            if(!field[0].validity.valid) {
                showError(field);
                event.preventDefault();
                field[0].classList.add("_invalid");
                submitBtn.classList.add("_disabled");
            } else {
                field[1].className = 'error';
                field[0].classList.remove("_invalid");
                submitBtn.classList.remove("_disabled");
            }

        })
    })

    form.addEventListener('submit', function (event) {
        let Valide = false;

        validatedFields.forEach(field => {

            if(!field[0].validity.valid) {
                showError(field);
                field[0].classList.add("_invalid");
                submitBtn.classList.add("_disabled");
                event.preventDefault();
            } else {
                Valide = true;
                field[1].className = 'error';
                field[0].classList.remove("_invalid");
                submitBtn.classList.remove("_disabled");
                event.preventDefault();
            }

        })

    if(Valide) {
        console.log("Форма отправлена!");
        /*тут отправляем форму*/
    }
    });
}

function showError(field) {
    if(field[0].validity.valueMissing) {
        field[1].textContent = "Поле обязательное для заполнения";
    } else if(field[0].validity.patternMismatch) {
        field[2] ? field[1].textContent = field[2] : field[1].textContent = "Поле обязательное для заполнения";
    }

    field[1].className = 'error active';
}