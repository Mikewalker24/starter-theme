import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';

import {focusHash, bindInPageLinks} from '@shopify/theme-a11y';
import {cookiesEnabled} from '@shopify/theme-cart';

// Common a11y fixes
focusHash();
bindInPageLinks();

// Apply a specific class to the html element for browser support of cookies.
if (cookiesEnabled()) {
  document.documentElement.className = document.documentElement.className.replace(
    'supports-no-cookies',
    'supports-cookies',
  );
}

// Quantity buttons

const $changeQuantity = $('.js-change-quantity');

if ($changeQuantity) {
  $changeQuantity.on('click', function () {
    const $this = $(this);
    const $input = $(this).siblings('input');
    const val = parseInt($input.val());
    let valMax = 999;
    const valMin = $input.attr('min') || 0;

    if ($input.attr('max') != null) {
      valMax = $input.attr('max');
    }

    if (isNaN(val) || val < valMin) {
      $input.val(valMin);
      return false;
    } else if (val > valMax) {
      $input.val(valMax);
      return false;
    }

    if ($this.data('func') === 'plus') {
      if (val < valMax) {
        $input.val(val + 1);
      }
    } else {
      if (val > valMin) {
        $input.val(val - 1);
      }
      if ($this.parents('.cart_item').length) {
        if (val - 1 === 0) {
          $this.closest('.cart_item').addClass('animated fadeOutUp');
        }
      }
    }
    $input.trigger('change');
    return false;
  });
