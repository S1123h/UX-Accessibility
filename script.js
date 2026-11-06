/**
 * Accessible Tech Digest
 * ----------------------
 * Handles:
 * 1. Topic filter feedback through an accessible live region
 * 2. Newsletter validation with clear, programmatic error announcements
 * 3. Focus management after successful submission
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initializeTopicFilter();
    initializeNewsletterForm();
  });

  /**
   * Provide non-visual feedback for the topic filter.
   * The result region already has role="status" and aria-live="polite".
   */
  function initializeTopicFilter() {
    const form = document.querySelector('.topic-filter');
    const result = document.querySelector('.filter-result');

    if (!form || !result) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const selected = Array.from(
        form.querySelectorAll('input[name="topics"]:checked')
      ).map(function (input) {
        return input.value;
      });

      if (selected.length === 0) {
        result.textContent = 'No topics selected. Showing all articles.';
        return;
      }

      result.textContent =
        'Filter applied for: ' + selected.join(', ') + '. Showing matching articles.';
    });
  }

  /**
   * Validate the newsletter email field accessibly.
   * Uses aria-invalid, aria-describedby, role="alert", and focus management.
   */
  function initializeNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const errorElement = document.getElementById('email-error');

    if (!form || !emailInput || !errorElement) return;

    function isValidEmail(value) {
      // Practical client-side format check; server-side validation is still
      // required for real applications.
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function showError(message) {
      errorElement.textContent = message;
      emailInput.setAttribute('aria-invalid', 'true');
      emailInput.focus();
    }

    function clearError() {
      errorElement.textContent = '';
      emailInput.removeAttribute('aria-invalid');
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const email = emailInput.value.trim();

      if (email === '') {
        showError('Enter your email address.');
        return;
      }

      if (!isValidEmail(email)) {
        showError('Enter a valid email address, such as name@example.com.');
        return;
      }

      clearError();
      form.reset();

      // Announce success through the same live error region. Because the
      // element has role="alert", screen readers will announce the update.
      errorElement.textContent = 'Subscription confirmed. Check your inbox for a welcome message.';
      errorElement.style.color = 'var(--success)';
    });

    // Clear the error as soon as the user begins correcting the field.
    emailInput.addEventListener('input', function () {
      if (emailInput.getAttribute('aria-invalid') === 'true') {
        clearError();
        errorElement.style.color = '';
      }
    });
  }
})();
