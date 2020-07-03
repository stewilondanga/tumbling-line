var navigate = (function() {
	$('.dd').toggle();
	$('.dd_btn').click(function() {
		var dataName = $(this).attr('data-name');
		$('.dd').hide();
		$('.' + dataName).toggle();
	});
})();

(() => {
  const container = document.querySelector(".container");
  const more = document.querySelector(".more");
  const quantity = document.querySelector(".quantity");
  let notification = false;
  class Dominoes {
    renderCheckboxes() {
      const container = document.querySelector(".container");
      const checkboxTemplate = id => {
        return `<input class="checkbox" type="checkbox" id=${id}><label class="domino" for=${id}></label>`;
      };
      const value = quantity.value
      for (let i = 0; i < value; i++) {
        const id = `checkbox${i}`;
        container.innerHTML += checkboxTemplate(id);
      }
    }

    handleCheck(checkbox) {
      let drop = setTimeout(() => {
        if (checkbox) {
          checkbox.checked = true;
          const nextCheckbox = $(checkbox).nextAll(".checkbox")[0];
          this.handleCheck(nextCheckbox);
          clearTimeout(drop);
        }
      }, 70);
    }

    handleReset() {
      container.innerHTML = "";
      this.renderCheckboxes();
      this.assignCheckboxListeners();
    }

    handleChange(e) {
      if (e.currentTarget.value > 300 && !notification) {
          alert(`The quantity is ${e.currentTarget.value}!!!!!11 Use at your own risk ;)`);
        notification = true;
      }
    }

    assignCheckboxListeners() {
      const checkboxes = Array.from(document.querySelectorAll(".checkbox"));
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener(
          "change",
          this.handleCheck.bind(this, checkbox)
        );
      });
    }

    assignListeners() {
      this.assignCheckboxListeners();
      more.addEventListener("click", this.handleReset.bind(this));
      quantity.addEventListener("change", this.handleChange.bind(this));
    }

    init() {
      this.renderCheckboxes();
      this.assignListeners();
    }
  }

  const dominoes = new Dominoes();
  dominoes.init();
})();
