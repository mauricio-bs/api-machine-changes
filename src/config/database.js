export default {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PSWD,
  database: process.env.DATABASE_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
