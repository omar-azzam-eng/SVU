export const showToast = (message, tone = "success") => {
  const toastElement = document.querySelector("#site-toast");
  if (!toastElement || typeof bootstrap === "undefined") return;
  const messageElement = toastElement.querySelector("span");
  if (messageElement) messageElement.textContent = message;
  const icon = toastElement.querySelector("i");
  if (icon)
    icon.className = `bi bi-${tone === "error" ? "exclamation-circle-fill text-danger" : "check-circle-fill text-success"}`;
  bootstrap.Toast.getOrCreateInstance(toastElement, { delay: 3500 }).show();
};

export const initializeInteractiveForms = () => {
  document.querySelectorAll("[data-interactive-form]").forEach((form) =>
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      form.reset();
      form.classList.remove("was-validated");
      const modal = form.closest(".modal");
      if (modal && typeof bootstrap !== "undefined")
        bootstrap.Modal.getOrCreateInstance(modal).hide();
      showToast("تم التحقق من البيانات بنجاح.");
    }),
  );
};

export const initializeContactForm = () => {
  const form = document.querySelector("#contact-form");
  const alertElement = document.querySelector("#contact-alert");
  if (!form || !alertElement) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      alertElement.className = "alert alert-danger";
      alertElement.innerHTML =
        '<i class="bi bi-exclamation-circle me-2"></i>يرجى تصحيح الحقول المطلوبة قبل المتابعة.';
      return;
    }
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML =
        '<span class="spinner-border spinner-border-sm ms-2" aria-hidden="true"></span> جارٍ التحقق...';
    }
    window.setTimeout(() => {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML =
          'إرسال الرسالة <i class="bi bi-arrow-left"></i>';
      }
      form.reset();
      form.classList.remove("was-validated");
      alertElement.className = "alert alert-success";
      alertElement.innerHTML = "تم التحقق من بيانات الرسالة بنجاح.";
    }, 500);
  });
  form.addEventListener("reset", () => {
    form.classList.remove("was-validated");
    alertElement.className = "alert d-none";
    alertElement.textContent = "";
  });
};
