import test from 'node:test';
import assert from 'node:assert/strict';
import { portalyUrl } from '../src/utils/portaly';

test('付款未設定或連結不安全時，關閉購買入口', () => {
  for (const value of [undefined, null, '', 'javascript:alert(1)', 'http://portaly.cc/example', 'https://portaly.cc.attacker.test/buy', 'https://attacker.test/portaly.cc', 'https://user:password@portaly.cc/buy', 'https://portaly.cc:8443/buy', 'https://portaly.cc/', 'https://portaly.cc/admin/payment']) {
    assert.equal(portalyUrl(value), null, String(value));
  }
});
test('接受合法 Portaly 商品與託管結帳連結', () => {
  assert.equal(portalyUrl(' https://portaly.cc/example/products/demo '), 'https://portaly.cc/example/products/demo');
  assert.equal(portalyUrl('https://portaly.ai/checkout/subscription/demo'), 'https://portaly.ai/checkout/subscription/demo');
});
