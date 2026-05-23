/* ============================================================
   modal.js — Base Pair to Blueprint
   Contact modal logic shared across all pages.
   Replace FORMSPREE_URL with your actual endpoint when ready.
   ============================================================ */

(function () {
  const FORMSPREE_URL = 'https://formspree.io/f/YOUR_CODE_HERE';

  const modal    = document.getElementById('contact-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close');

  function openModal(e) {
    e.preventDefault();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById('modal-form-view').style.display    = 'block';
    document.getElementById('modal-thankyou-view').style.display = 'none';
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('a[href="#contact"], a[href="biomimicry.html#contact"]')
    .forEach(link => link.addEventListener('click', openModal));

  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  const form = document.getElementById('contact-form');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    const data = {
      firstName: form.querySelector('#modal-first').value,
      lastName:  form.querySelector('#modal-last').value,
      email:     form.querySelector('#modal-email').value,
      interest:  form.querySelector('#modal-interest').value,
      message:   form.querySelector('#modal-message').value,
    };

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Server error');
    } catch (_) {
      // Formspree not set up yet — show thank-you anyway
    } finally {
      document.getElementById('modal-form-view').style.display    = 'none';
      document.getElementById('modal-thankyou-view').style.display = 'block';
      submitBtn.textContent = 'Send message';
      submitBtn.disabled = false;
    }
  });
})();
