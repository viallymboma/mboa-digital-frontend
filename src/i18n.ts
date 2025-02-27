import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // Bind react-i18next to i18next
  .init({
    resources: {
      en: {
        translation: {
          register: {
            "title": "Create an account",
            "firstName": "First name",
            "firstNamePlaceHolder": "Enter your first name",
            "lastName": "Last name",
            "lastNamePlaceHolder": "Enter your last name",
            "email": "Email",
            "emailPlaceHolder": "Enter your email address",
            "password": "Password",
            "passwordPlaceHolder": "Enter a password",
            "confirmPassword": "Confirm Password",
            "confirmPasswordPlaceHolder": "Confirm your password",
            "submit": "Register",
            "loginPrompt": "Already have an account? Login"
          }, 
          "searchLang": "Search", 
        }
      },
      fr: {
        translation: {
          register: {
            "title": "Créer un compte",
            "firstName": "Prénom",
            "firstNamePlaceHolder": "Entrez votre prénom",
            "lastName": "Nom de famille",
            "lastNamePlaceHolder": "Entrez votre nom de famille", 
            "email": "Email",
            "emailPlaceHolder": "Entrez votre addresse email", 
            "password": "Mot de passe",
            "passwordPlaceHolder": "Entrez un mot de passe",
            "confirmPassword": "Confirmer le mot de passe",
            "confirmPasswordPlaceHolder": "Confirmez votre mot passe",
            "submit": "S'inscrire",
            "loginPrompt": "Vous avez déjà un compte? Connexion"
          }
        },
        "searchLang": "Rechercher", 
      },
      es: {
        translation: {
          register: {
            "title": "Crear una cuenta",
            "firstName": "Nombre",
            "firstNamePlaceHolder": "Ingresa tu nombre",
            "lastName": "Apellido",
            "lastNamePlaceHolder": "Ingresa tu apellido",
            "email": "Correo electrónico",
            "emailPlaceHolder": "Ingresa tu correo electrónico",
            "password": "Contraseña",
            "passwordPlaceHolder": "Ingresa una contraseña",
            "confirmPassword": "Confirmar contraseña",
            "confirmPasswordPlaceHolder": "Confirma tu contraseña",
            "submit": "Registrarse",
            "loginPrompt": "¿Ya tienes una cuenta? Iniciar sesión"
          }
        }
      }
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes
    }
  });

export default i18n;





















// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// i18n
//   .use(initReactI18next) // Bind react-i18next to i18next
//   .init({
//     resources: {
//       en: {
//         translation: {
//           register: {
//             "title": "Create an account",
//             "firstName": "First name",
//             firstNamePlaceHolder: "Enter your first name",
//             "lastName": "Last name",
//             lastNamePlaceHolder: "Enter your last name",
//             "email": "Email",
//             emailPlaceHolder: "Enter your email address",
//             "password": "Password",
//             passwordPlaceHolder: "Enter a password",
//             "confirmPassword": "Confirm Password",
//             confirmPasswordPlaceHolder: "Confirm your password",
//             "submit": "Register",
//             "loginPrompt": "Already have an account? Login"
//           }
//         }
//       },
//       fr: {
//         translation: {
//           register: {
//             "title": "Créer un compte",
//             "firstName": "Prénom",
//             firstNamePlaceHolder: "Entrez votre prénom",
//             "lastName": "Nom de famille",
//             lastNamePlaceHolder: "Entrez votre nom de famille", 
//             "email": "Email",
//             emailPlaceHolder: "Entrez votre addresse email", 
//             "password": "Mot de passe",
//             passwordPlaceHolder: "Entrez un mot de passe",
//             "confirmPassword": "Confirmer le mot de passe",
//             confirmPasswordPlaceHolder: "Confirmez votre mot passe",
//             "submit": "S'inscrire",
//             "loginPrompt": "Vous avez déjà un compte? Connexion"
//           }
//         }
//       }
//     },
//     lng: "en", // Default language
//     fallbackLng: "en", // Fallback language
//     interpolation: {
//       escapeValue: false, // React already escapes
//     }
//   });

// export default i18n;
