import PasswordValidator from 'password-validator';

// Création du schéma
const schema = new PasswordValidator();

// Définition du format de mdp
schema
.is().min(8)                                    // Minimum 8 caractères
.is().max(100)                                  // Maximum 100 caractères
.has().uppercase()                              // Doit contenir au moins 1 majuscule
.has().lowercase()                              // Doit contenir des minuscules
.has().digits(1)                                // Doit comprendre au moins 1 chiffre
.has().symbols(1)                               // Doit comprendre au moins 1 caractère spécial
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export default schema;
