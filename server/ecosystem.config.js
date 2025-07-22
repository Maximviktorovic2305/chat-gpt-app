module.exports = {
  apps : [{
    name   : "chat-gpt-app-server",
    script : "dist/main.js", 
    env_production: {
       NODE_ENV: "production"
    }
  }]
};