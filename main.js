const updateScheduling = () => {
    const adults = +adultsInput.val() ?? 1;
    const days = moment(checkOutInput.val()).diff(moment(checkInInput.val()), 'days') - 1 ?? 0;
    const cost = days * adults * 150;

    daysOutput.val(days || '');
    costOutput.val(cost || '');
}

const form = $("#form");

const adultsInput = $("#adultsInput").change(updateScheduling);
const checkInInput = $("#checkInInput").change(updateScheduling);
const checkOutInput = $("#checkOutInput").change(updateScheduling);
const daysOutput = $("#daysOutput");
const costOutput = $("#costOutput");

const textInputs = {
    username: $("#usernameInput"),
    'first name': $("#firstnameInput"),
    'last name': $("#lastnameInput"),
    phone: $("#phoneInput"),
    fax: $("#faxInput"),
    email: $("#emailInput"),
}

form.on("reset", () => {
    toastr.info("All fields cleared successfully");
});

form.submit(() => {
    const notPassed = [];
    for (const [name, jq] of Object.entries(textInputs)) {
        if (jq.val()) {
            jq.parent().removeClass("has-error");
        } else {
            jq.parent().addClass("has-error");
            notPassed.push(name);
        }
    }

    let hasError = false;

    if (notPassed.length > 0) {
        toastr.error(`Missing ${notPassed.join(', ')}`);
        hasError = true;
    }

    if (!costOutput.val()) {
        toastr.error('No cost has been calculated');
        hasError = true;
    }

    if (+costOutput.val() < 0) {
        toastr.error('Cost must be positive');
        hasError = true;
    }

    if (!hasError) {
        toastr.success('Form successfully submitted!');
    }

    return false;
});