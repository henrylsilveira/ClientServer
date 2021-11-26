'use strict';
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async login(ctx) {
    const { email, password } = ctx.request.body
    const person = await strapi.services.person.findOne({ email, password });

    if (person) {
      const jwt = await strapi.admin.services.token.createJwtToken(person.id)
      return {
        person: sanitizeEntity(person, { model: strapi.models.person }),
        jwt
      }
    }
  },
};
