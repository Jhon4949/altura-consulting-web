"use strict";

document.body.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
  const closeMenu = () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(expanded));
    navigation.classList.toggle("is-open", expanded);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

if (form && status) {
  const english = document.documentElement.lang === "en";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const value = (name) => String(data.get(name) || "").trim();
    if (!value("name") || value("message").length < 10) {
      status.textContent = english
        ? "Enter your name and a description of at least 10 characters."
        : "Escribe tu nombre y una descripción de al menos 10 caracteres.";
      return;
    }

    const subject = `${english ? "Altura Consulting website enquiry" : "Consulta web Altura Consulting"} — ${value("company") || value("name")}`;
    const body = [
      `${english ? "Name" : "Nombre"}: ${value("name")}`,
      `${english ? "Company" : "Empresa"}: ${value("company")}`,
      `${english ? "Email" : "Correo"}: ${value("email")}`,
      `${english ? "Country" : "País"}: ${value("country")}`,
      "",
      value("message"),
    ].join("\n");

    status.textContent = english
      ? "Your email app has been requested to open. Your enquiry has not been sent: review and send the draft. If it does not open, email alturaconsulting1@gmail.com."
      : "Se ha solicitado abrir tu aplicación de correo. La consulta todavía no se ha enviado: revisa el borrador y envíalo. Si no se abre, escribe a alturaconsulting1@gmail.com.";
    window.location.href = `mailto:alturaconsulting1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
