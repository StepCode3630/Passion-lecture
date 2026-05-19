import { defineConfig } from '@adonisjs/cors'

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 * correction : toutes les methodes doivent être autorisées pour permettre les requêtes de notre frontend, et les credentials doivent être autorisés pour permettre l'envoi des cookies d'authentification
 */
const corsConfig = defineConfig({
  enabled: true,
  /* appel a notre application frontend */
  origin: ['http://localhost:5173'],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
