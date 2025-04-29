








const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'SPARK-X-2025;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0pYL01IS3JGSEh2Ly91Yit0Q09PWmQ5QUJpY2RueG4wbkNLc0hjVGJWTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZURyRUlWK3MvR2Z6ZE9rYk1mV24xWm1rT0xGR2ZoMUU0TGMzWkRYcjZ5RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2SllHSUNnQTAvQnZBQldkK0VCTS9NMUpOTE9FYitrSkpFK2o4S3A4OTBnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhcHRpVG0vdWxRQmM1eDFkZGVSQnFVV0kwek9VR0UrN3BBK2k0dHVXZmdnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1FdDNCNk5jbTV6NzUydW9Sai81UGVWdEtDRlg2eTNhNWRQZmxPQzhrWGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRJVmtnVy9wZ1M1VzR0bk1YNmNOR1BiVmZlcHV2MU5QOS9yMlArZjF0Q3M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUVoSmo4ODNwaVN2OEZ6ai9uT25CUHB0WkpCTVIwZ1lSUWt4MDZtUVFIVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUtFOG9vV0hVUFJqVU1oRy9UdzMvNFVuVjNSczYzYkdVN2YzWlhpTW5nTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNCY2tpS1d4U0FDMGE1OVBpRk9iU0gvbk1NVUlobGc3ZkdjZ0RMb3hycjd5REZQZFZtVHdtM0FRSzlZTXhjV29Ockt4YlhFdTk1Y1dDUU0vZUxKMWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI2LCJhZHZTZWNyZXRLZXkiOiJET1RJMHIwRVlBZ255cTZiRyt5cUx0bDBLTHgzcW9JbEcrL2ttc3ZSdEMwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1ODQ0MzExMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0QjA2RTU5NkY5MDMxNUI3NzkzMEE2MUY3RDk1Q0ZGMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1OTM3MzEzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NTg0NDMxMTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTFDRjQ1N0E4RTlDNURCMDA0QUQ2NEI1NjNBOTI5RjgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTkzNzMxM31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiUjZGdFZqaFRSVC02Qm9YaVBpUE53USIsInBob25lSWQiOiJhYzA2NDBlYi05MGZkLTRjOGUtYjljMi01NDE5ZWQwODc3N2QiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNHF0YXJvc01TWTgxbmxLREV1MlVkSlkxazg0PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhMaCtNVFJkRnkyRnN5bWFlWVdEVExIdnNnQT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJWMjg0SlBMRSIsIm1lIjp7ImlkIjoiMjU0NzU4NDQzMTExOjMyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuKYheGOr+KYvO+4juKEkuKYvO+4juKEkuKcqeKEsOKcq+KEleKZqyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUDJsb004Q0VQakd3OEFHR0JBZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiR3lFWWh1Wk1hSG1uck9RUkQvU0g4TDBZUWYzZGhXNEk0U3JrcDJOVFBrTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY0xSeG05cVJPdHNKd0dreEk4eGdaS1dudjkwK0xYdkllVyttdHd3azVFS2hCWVJuUkZZT0lTVkJRNUxLQStHSmR3anNzYlhWem1ML09yeWUxZGRWQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6ImZjOVAyL3V4Q0tZSDJQcWI1UkZwUTVIckFnUExEMEJMWVNaQnI5V0ZhWGszQ0dONXIyV3h6VUZWMGRlUml3UnR2TzVMaXFxSHVXQzNkaVRsVzYxU2hRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzU4NDQzMTExOjMyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJzaEdJYm1UR2g1cDZ6a0VRLzBoL0M5R0VIOTNZVnVDT0VxNUtkalV6NUQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDU5MzcyODUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTFV2In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 254758443111",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'SPARK-X-2025',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/cXrVMRgL/file-1131.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    CHATBOT : process.env.CHATBOT || 'no',
    CHATBOT1 : process.env.CHATBOT1 || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
    ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  MENUTYPE : process.env.MENUTYPE || '',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_SAVE_CONTACTS_NAME: "SPARK-X", // Default name prefix for new contacts
                  AUTO_REPLY_MESSAGE: "", 
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
