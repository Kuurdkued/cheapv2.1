
import { Product } from '../types';
import { CONTACT_INFO } from '../constants';

export const generateWhatsAppLink = (product: Product) => {
  const date = new Date().toLocaleString('ku-IQ');
  const message = `سڵاو، دەمەوێت ئەم بەرهەمە بکڕم:

بەرهەم: ${product.name}
جۆر: ${product.category}
نرخ: ${product.price.toLocaleString()} دینار
بەروار: ${date}

تکایە وردەکارییەکانم بۆ بنێرە.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedMessage}`;
};
