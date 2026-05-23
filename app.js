/* ==========================================
   Hogwarts Audiobook Library: Logic & Player
   ========================================== */

// Service Worker Registration for Offline App Shell
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registered', reg.scope))
      .catch(err => console.log('Service Worker registration failed', err));
  });
}

// Hardcoded Google Drive Data Scraped from Public Folder
const driveData = {
    "7":  {
              "chapters":  [
                               {
                                   "id":  "1LFLCanBtrq_1R_eqP-pAbNXCS9judyJR",
                                   "name":  "01 - Opening Credits.mp3"
                               },
                               {
                                   "id":  "1d0stN0Opa1flYYdM5AePyCYnnvgwvvWr",
                                   "name":  "02 - The Dark Lord Ascending.mp3"
                               },
                               {
                                   "id":  "1912dG9aUiNXbd9GLYC7P_WkxiubwULJh",
                                   "name":  "03 - In Memoriam.mp3"
                               },
                               {
                                   "id":  "11gmi5WaDdH9LOFmKg0yo0x8g1dnkRk3l",
                                   "name":  "04 - The Dursleys Departing.mp3"
                               },
                               {
                                   "id":  "165R8N2O6LTdRCeDXRzcFDFAvN7j1vQYS",
                                   "name":  "05 - The Seven Potters.mp3"
                               },
                               {
                                   "id":  "1bZK3ACQE4FPhLvqflABCv37pm2LiSAEa",
                                   "name":  "06 - Fallen Warrior.mp3"
                               },
                               {
                                   "id":  "1xUsyHl2SRrLryLP7TqfZ4t4DOPnEsxbO",
                                   "name":  "07 - The Ghoul in Pyjamas.mp3"
                               },
                               {
                                   "id":  "1ZWRqDtuP6iGj7vSDPTD08ZnOv7Sjjk7o",
                                   "name":  "08 - The Will of Albus Dumbledore.mp3"
                               },
                               {
                                   "id":  "16SKiL1iOBpe1yU6B7AWi-k7bVLLSacnH",
                                   "name":  "09 - The Wedding.mp3"
                               },
                               {
                                   "id":  "1JpDD50TYraq_Xm4zybv3NrlKrjjl2a8b",
                                   "name":  "10 - A Place to Hide.mp3"
                               },
                               {
                                   "id":  "1jsHB5Vu_bgPnQB-ET29LDgOoiC5ZdBZ8",
                                   "name":  "12 - The Bribe.mp3"
                               },
                               {
                                   "id":  "1rv-kuydX8LHd2hGR4lFtCWITRW9wRGno",
                                   "name":  "13 - Magic is Might.mp3"
                               },
                               {
                                   "id":  "10JTB5p484QOLia5tFWGI1fC50sE8vTD7",
                                   "name":  "14 - The Muggle-Born Registration Commission.mp3"
                               },
                               {
                                   "id":  "18pTn9wp_s-Ok-K3mlcn5A7etULdhCsfM",
                                   "name":  "15 - The Thief.mp3"
                               },
                               {
                                   "id":  "1WUob_FJCqdKVzNVae4GTGZxSdDrJM4OG",
                                   "name":  "19 - The Life and Lies of Albus Dumbledore.mp3"
                               },
                               {
                                   "id":  "11yyd6rcEFylju2ueP_lEBqO7QjJlg56J",
                                   "name":  "20 - The Silver Doe.mp3"
                               },
                               {
                                   "id":  "1bmOEJJlcqArlt_EaHJTSI70lOfviOfFl",
                                   "name":  "21 - Xenophilius Lovegood.mp3"
                               },
                               {
                                   "id":  "16Edfabf-_lu1If3zXtWs8IdgmM5Xw_tw",
                                   "name":  "22 - The Tale of the Three Brothers.mp3"
                               },
                               {
                                   "id":  "130WtjU8EIfdEVPUS5_xso7gnIO5jeEyE",
                                   "name":  "23 - The Deathly Hallows.mp3"
                               },
                               {
                                   "id":  "1Xprdw0_0YMB9Jw64tAYvmOxrTudFBNaV",
                                   "name":  "24 - Malfoy Manor.mp3"
                               },
                               {
                                   "id":  "1Wagb3YhO2bj42ooSsK4jTh3z5UVnx5Ic",
                                   "name":  "25 - The Wandmaker.mp3"
                               },
                               {
                                   "id":  "1coqqI_QHr3gFisu7Ut6z8k3ctfcTX0cC",
                                   "name":  "26 - Shell Cottage.mp3"
                               },
                               {
                                   "id":  "1jyPtqf01VutpzuoqXLhWdh6QjOIGcPvf",
                                   "name":  "27 - Gringotts.mp3"
                               },
                               {
                                   "id":  "1Oj7srr6D92-uG8GNrHwXiAekTihNM3_A",
                                   "name":  "28 - The Final Hiding Place.mp3"
                               },
                               {
                                   "id":  "1tXkwZOcqTEEgZzmh4hXOpnYEQyeSHKSR",
                                   "name":  "29 - The Missing Mirror.mp3"
                               },
                               {
                                   "id":  "1PAEJpP2PB8KRcLLkj4-lDw30Pc3piB6T",
                                   "name":  "30 - The Lost Diadem.mp3"
                               },
                               {
                                   "id":  "1Nit7ztHsJEo6aBSkNo9LetBFmBI7-yIN",
                                   "name":  "31 - The Sacking of Severus Snape.mp3"
                               },
                               {
                                   "id":  "1UXyl_mXr-ubBzx-akh1rqtwdWsaRssvu",
                                   "name":  "32 - The Battle of Hogwarts.mp3"
                               },
                               {
                                   "id":  "1ICkuwg9EWHsMh3ymbY9LltsFrac0KKg7",
                                   "name":  "33 - The Elder Wand.mp3"
                               },
                               {
                                   "id":  "1oVy9hWfbl5c3ASA8-lMlD10N2GkLTN9e",
                                   "name":  "35 - The Forest Again.mp3"
                               },
                               {
                                   "id":  "1ygt_Ekbl7dWOT8MrN1b-da0BLLJ3u47k",
                                   "name":  "37 - The Flaw in the Plan.mp3"
                               },
                               {
                                   "id":  "179UnDOYsqMbCXuA2HYl5hJnLWTPJn5qJ",
                                   "name":  "38 - Epilogue - Nineteen Years Later.mp3"
                               },
                               {
                                   "id":  "1XGKYwQw_9YUuiTQaP8zKnCoBje_apo4m",
                                   "name":  "39 - End Credits.mp3"
                               }
                           ],
              "coverId":  "1DeZmuCDSLU6bF6OxMXaxG7VazGzIQBTL"
          },
    "3":  {
              "chapters":  [
                               {
                                   "id":  "1ykJnfqwhPB7XLXg08aJSJ3Xa9yV578JT",
                                   "name":  "01 - Opening Credits.mp3"
                               },
                               {
                                   "id":  "1Ivu12oEiiNknWpCPuWsXohl7_WVm-fnE",
                                   "name":  "02 - Owl Post.mp3"
                               },
                               {
                                   "id":  "1KxGOhwpgx0at_zazS12ZtLOdG0NqFvE_",
                                   "name":  "04 - The Knight Bus.mp3"
                               },
                               {
                                   "id":  "1t-CvDhgQPhXaJ_EzYqKZJ-nJUS6kIOgO",
                                   "name":  "05 - The Leaky Cauldron.mp3"
                               },
                               {
                                   "id":  "1D4n1b8Up03zbjRnOOT9GxqmfglYdM7m6",
                                   "name":  "06 - The Dementor.mp3"
                               },
                               {
                                   "id":  "1XpUDDQ7BArhGz9F1ujGP8VBCJxA7ESS0",
                                   "name":  "07 - Talons and Tea Leaves.mp3"
                               },
                               {
                                   "id":  "1QVRWmUxGzrxLm6CGmmMJi6rVGRDdpAAh",
                                   "name":  "08 - The Boggart in the Wardrobe.mp3"
                               },
                               {
                                   "id":  "1Cj8avyao5dzcX6qJRrAEOLMFOMu1Izdx",
                                   "name":  "09 - Flight of the Fat Lady.mp3"
                               },
                               {
                                   "id":  "1myLFZy81fhiV1bR3nqqF4pQDSSxo9iii",
                                   "name":  "10 - Grim Defeat.mp3"
                               },
                               {
                                   "id":  "1kwbtvgE7_LjSsZS8zJq0yw1DkHnYFCYy",
                                   "name":  "12 - The Firebolt.mp3"
                               },
                               {
                                   "id":  "1533MuM8mdBXvxtbIKiByXsu2NqKGd5lP",
                                   "name":  "13 - The Patronus.mp3"
                               },
                               {
                                   "id":  "1jQ-xz8zIZiMFfTcMie9D6LwwDPgnedkR",
                                   "name":  "14 - Gryffindor versus Ravenclaw.mp3"
                               },
                               {
                                   "id":  "12uaEYNn81Fa9QECA4eeA37dMjKaP8Yqt",
                                   "name":  "16 - The Quidditch Final.mp3"
                               },
                               {
                                   "id":  "1-osYboRdQBsWOwS4JSbq9foHCn6HVGda",
                                   "name":  "18 - Cat, Rat and Dog.mp3"
                               },
                               {
                                   "id":  "1Skx4WqAz2qXKfk4960xAc5F1JdvJQSvR",
                                   "name":  "19 - Moony, Wormtail, Padfoot and Prongs.mp3"
                               },
                               {
                                   "id":  "1iJk1HRSmTe-HwNuiMgAwbT_UfjZAtxip",
                                   "name":  "20 - The Servant of Lord Voldemort.mp3"
                               },
                               {
                                   "id":  "1riR77cupTGTdEe7rFW0Crsi8-tjkx3uy",
                                   "name":  "23 - Owl Post Again.mp3"
                               },
                               {
                                   "id":  "1AExso-q3quVeGA42hyUP-WsfpXTFsjNK",
                                   "name":  "24 - End Credits.mp3"
                               }
                           ],
              "coverId":  "1UTdB7OeEBHKs4aIWv_4rK3PAZY_8oIhY"
          },
    "2":  {
              "chapters":  [
                               {
                                   "id":  "1JAW1A9vZHygWk0DRjKHZHIlog_HDNBRT",
                                   "name":  "01 - Opening Credits.mp3"
                               },
                               {
                                   "id":  "1m9_piof_qUZoaWQ3qhWv2gPVBNEeaKL8",
                                   "name":  "02 - The Worst Birthday.mp3"
                               },
                               {
                                   "id":  "1OLk5MFMXC6_SdXVK68UWutM1jsnhYybM",
                                   "name":  "04 - The Burrow.mp3"
                               },
                               {
                                   "id":  "1ApFISNXjSuWY1ifkBJLWxjSz3IR9Ea5U",
                                   "name":  "05 - At Flourish and Blotts.mp3"
                               },
                               {
                                   "id":  "135NkLzyT-6P_08lO-9RXDkksqbJu5nux",
                                   "name":  "06 - The Whomping Willow.mp3"
                               },
                               {
                                   "id":  "1VE5gE0lowrsaM-LAAL1T5Qspb3r1-jQo",
                                   "name":  "07 - Gilderoy Lockhart.mp3"
                               },
                               {
                                   "id":  "1f9bh-pqszCKTuSy9tef-nIPkuO4Ar5fW",
                                   "name":  "08 - Mudbloods and Murmurs.mp3"
                               },
                               {
                                   "id":  "1bVz7117sJkicf4zrakSXJJyEWtnjihyd",
                                   "name":  "09 - The Deathday Party.mp3"
                               },
                               {
                                   "id":  "1jRZx1uQLkpS7Ld_UWoIxWFMrIN-o3rpe",
                                   "name":  "10 -  The Writing on the Wall.mp3"
                               },
                               {
                                   "id":  "12oqUs2cOTkrtZ13j09xLcbejALPH4f5C",
                                   "name":  "11 - The Rogue Bludger.mp3"
                               },
                               {
                                   "id":  "13p2cuFRXOvRvS_app1TQdxjGoKQ3U2y8",
                                   "name":  "12 - The Duelling Club.mp3"
                               },
                               {
                                   "id":  "1KXL6B1IVA2Cx5TPpI1ydEZOCcPSoquI7",
                                   "name":  "13 - The Polyjuice Potion.mp3"
                               },
                               {
                                   "id":  "1wmsS-twbD8B26OWLpn8vEkQrGICBVu0p",
                                   "name":  "14 - The Very Secret Diary.mp3"
                               },
                               {
                                   "id":  "12vIheQ82ByWStvaRyDOkwI7-CY5pfszw",
                                   "name":  "15 - Cornelius Fudge.mp3"
                               },
                               {
                                   "id":  "14LLJvJj8vsODDvdjF0_nvt89UJnQccfw",
                                   "name":  "16 - Aragog.mp3"
                               },
                               {
                                   "id":  "1i9rfmvkyfIP6n8F3IIWZGhlglOS_EE4Q",
                                   "name":  "17 - The Chamber of Secrets.mp3"
                               },
                               {
                                   "id":  "1gJAca8UIs32L0aRKj9v3fb2gmpAeZJIC",
                                   "name":  "18 - The Heir of Slytherin.mp3"
                               },
                               {
                                   "id":  "1HFmyYnaUBaRVFrEEAZ9-rSoIIfaueTxg",
                                   "name":  "20 - End Credits.mp3"
                               }
                           ],
              "coverId":  "1-JETsS6grxhZ2wUQD2lvC3k2K2jr07n0"
          },
    "1":  {
              "chapters":  [
                               {
                                   "id":  "1etcTX8OoJ6j0fyTyWX4gyGl3LLXR8S_I",
                                   "name":  "01 - Opening Credits.mp3"
                               },
                               {
                                   "id":  "14-JNt2xZQgOTeSPoJZb0cZkZDru9TNj8",
                                   "name":  "02 - The Boy Who Lived.mp3"
                               },
                               {
                                   "id":  "1_C4Xb2K_uyGY3_YFgM6e36-2z6w7WDKi",
                                   "name":  "03 - The Vanishing Glass.mp3"
                               },
                               {
                                   "id":  "1MspgZiYxpGoOnFWdVy74L2Uvd2SGJYAK",
                                   "name":  "04 - The Letters from No One.mp3"
                               },
                               {
                                   "id":  "1D2Sx9xO_s4j4jN79mmShYfGOWOpAHACa",
                                   "name":  "05 - The Keeper of the Keys.mp3"
                               },
                               {
                                   "id":  "1MrLq-DhSJsd7kdQXulpez37qWV3n3Otk",
                                   "name":  "06 - Diagon Alley.mp3"
                               },
                               {
                                   "id":  "1-pLQG5TyWmqpTQ4xq_aAJw-Otydogs95",
                                   "name":  "07 - The Journey from Platform Nine and Three-Quarters.mp3"
                               },
                               {
                                   "id":  "1uivvhtIUwTp5ZkxZxqbgBH0tody7pzam",
                                   "name":  "08 - The Sorting Hat.mp3"
                               },
                               {
                                   "id":  "1XFGCHAw5PWThe6uoh_fecWibpgABjbmI",
                                   "name":  "09 - The Potions Master.mp3"
                               },
                               {
                                   "id":  "1grdyjH7ycnHnVp_IWIrt3gdW_tXdvoZS",
                                   "name":  "10 - The Midnight Duel.mp3"
                               },
                               {
                                   "id":  "1S1uP2g4UK9kvatS402SHwaSOzfHLyta1",
                                   "name":  "12 - Quidditch.mp3"
                               },
                               {
                                   "id":  "1wWUZUX2snHo4WI8nQetboOYaB4NAM_Lw",
                                   "name":  "13 - The Mirror of Erised.mp3"
                               },
                               {
                                   "id":  "1XfAOBVM-f2fZDHawtUIw9XZgJb3JsLGd",
                                   "name":  "14 - Nicolas Flamel.mp3"
                               },
                               {
                                   "id":  "1krp-aVTmnNk-iyXD76eBYIs2sCX_5GPT",
                                   "name":  "15 - Norbert the Norwegian Ridgeback.mp3"
                               },
                               {
                                   "id":  "1R5cicWtqAutM_eZDpJnjjJ3AqyeAokR7",
                                   "name":  "16 - The Forbidden Forest.mp3"
                               },
                               {
                                   "id":  "1CJB-4RtOov_jgboEHLMbKRyC_YdOGwG9",
                                   "name":  "17 - Through the Trapdoor.mp3"
                               },
                               {
                                   "id":  "1knQsEGQqGFtK3TOak8ISynkQhHrWKn7M",
                                   "name":  "18 - The Man with Two Faces.mp3"
                               },
                               {
                                   "id":  "1vTdlZ1IvCMiWRl45ACphO5jeONr4qF_d",
                                   "name":  "19 - End Credits.mp3"
                               }
                           ],
              "coverId":  "1G6r1wG11QDJOOgFbEz9u-Pmxd9_Bz14U"
          },
    "4":  {
              "chapters":  [
                               {
                                   "id":  "1eT-57lmJ-merGCCOdHHOfyEJFqpSW5jR",
                                   "name":  "01 - Opening Credits.mp3"
                               },
                               {
                                   "id":  "102U9o5ImA5Uk6wMqzmiftrjLGb2v_D__",
                                   "name":  "02 - The Riddle House.mp3"
                               },
                               {
                                   "id":  "1JGRUh2kpQYuQup0xMAUJxfJAQK8y9rul",
                                   "name":  "03 - The Scar.mp3"
                               },
                               {
                                   "id":  "1El3GmhOG8EI9ajKiEM7osefSHlTpshck",
                                   "name":  "04 - The Invitation.mp3"
                               },
                               {
                                   "id":  "1wsduZUy0DBKjwrjK0-t_gqn6qjpnrvug",
                                   "name":  "05 - Back to the Burrow.mp3"
                               },
                               {
                                   "id":  "1v3tFtnR7Wu-5cAwv-TgZ-XP-PvO5nUk3",
                                   "name":  "07 - The Portkey.mp3"
                               },
                               {
                                   "id":  "1u_NpyUKB3D7lniKO27xAavVznoOz9HvR",
                                   "name":  "08 - Bagman and Crouch.mp3"
                               },
                               {
                                   "id":  "1cEGoaSdbAnZL7jeYq_pKkyMOYbxVJhCs",
                                   "name":  "09 - The Quidditch World Cup.mp3"
                               },
                               {
                                   "id":  "1ES-r3jwed358kf9YJ0lMNbsv5ACQGxQF",
                                   "name":  "10 - The Dark Mark.mp3"
                               },
                               {
                                   "id":  "1L9yDzroQorp1OCX74rQ_gNAUJh0g_6yE",
                                   "name":  "11 - Mayhem at the Ministry.mp3"
                               },
                               {
                                   "id":  "1Qre8AmADxMsXQRJgUu_EWttA3S4bTB6t",
                                   "name":  "12 - Aboard the Hogwarts Express.mp3"
                               },
                               {
                                   "id":  "1Wek4hn-qD5YpFlzSJfatSMjDT7wsbu2a",
                                   "name":  "13 - The Triwizard Tournament.mp3"
                               },
                               {
                                   "id":  "1uPf5j3vA1RmmcaoDaDHN_mLrs7TWvSO_",
                                   "name":  "14 - Mad-Eye Moody.mp3"
                               },
                               {
                                   "id":  "1nmw9YrY0f9YFwcKYa5nGb6ai51q1DW0i",
                                   "name":  "15 - The Unforgivable Curses.mp3"
                               },
                               {
                                   "id":  "1W66tfVuN7Ijhi7VcNkHDP8SG7iQDCzKI",
                                   "name":  "16 - Beauxbatons and Durmstrang.mp3"
                               },
                               {
                                   "id":  "1rMP3lbdPDyE_N39Yruju4c9OjO3QY9d9",
                                   "name":  "17 - The Goblet of Fire.mp3"
                               },
                               {
                                   "id":  "1yNwguoFbqYCHmnZAootwlj5um5dRo3Ld",
                                   "name":  "18 - The Four Champions.mp3"
                               },
                               {
                                   "id":  "1tkVe-Z3tqO50FfZxRpRsS_7M_xzJjudK",
                                   "name":  "19 - The Weighing of the Wands.mp3"
                               },
                               {
                                   "id":  "16ues7PTZovJPGN-CjUDgxa0JaOFhv7bR",
                                   "name":  "20 - The Hungarian Horntail.mp3"
                               },
                               {
                                   "id":  "1L2WX1I5NcQdNXentSY7CLbr2qaPXkZKw",
                                   "name":  "21 - The First Task.mp3"
                               },
                               {
                                   "id":  "1q1Vc7JJHMDXNYHLdykcbylNrphBa1ob-",
                                   "name":  "22 - The House-Elf Liberation Front.mp3"
                               },
                               {
                                   "id":  "1Do6eISHhV5bZ97Qjl8YMZMw7QB4fy3i6",
                                   "name":  "23 - The Unexpected Task.mp3"
                               },
                               {
                                   "id":  "1KQe_9ik9L2x1oaejs5-NgznP8BPyf__h",
                                   "name":  "24 - The Yule Ball.mp3"
                               },
                               {
                                   "id":  "1oTeAjhiGCs06Veerr1RIgCjPQlT1IqQW",
                                   "name":  "26 - The Egg and the Eye.mp3"
                               },
                               {
                                   "id":  "1xH4OrqXxNLwaTjlsrxILcMvDEx_gWuTE",
                                   "name":  "27 - The Second Task.mp3"
                               },
                               {
                                   "id":  "1lCBunhaDyJ2mCZMd4yVDxm1Oy5qGgvKZ",
                                   "name":  "28 - Padfoot Returns.mp3"
                               },
                               {
                                   "id":  "1cHvcDXyRmt7woGicdabWNliqlshcO8r-",
                                   "name":  "29 - The Madness of Mr Crouch.mp3"
                               },
                               {
                                   "id":  "1Sah41FeZTe7BM9WJIJmFkLl52RWKor6f",
                                   "name":  "30 - The Dream.mp3"
                               },
                               {
                                   "id":  "1d5O1WaPaQdNPnUaNZBipm99CMNpgQXY8",
                                   "name":  "31 - The Pensieve.mp3"
                               },
                               {
                                   "id":  "1mYqz7NkMlIT4GI7mTErDy94bINC7z6mL",
                                   "name":  "32 - The Third Task.mp3"
                               },
                               {
                                   "id":  "18o9SsuqydKKoSqhbpb7GZb6-seYrgW09",
                                   "name":  "33 - Flesh, Blood and Bone.mp3"
                               },
                               {
                                   "id":  "13J_NvZW_TtfnTGeS8frPIzGwlnDxjV82",
                                   "name":  "34 - The Death Eaters.mp3"
                               },
                               {
                                   "id":  "1jDuUrKavrv9rc7Or422IfAZCKUYPN-4p",
                                   "name":  "35 - Priori Incantatem.mp3"
                               },
                               {
                                   "id":  "1lwe8vNxD4n3aJdk1WHFMMXG6c3Bh4O0A",
                                   "name":  "36 - Veritaserum.mp3"
                               },
                               {
                                   "id":  "1L8kLSqmVlBZkGcXMgm0XGzO8uauFsOIB",
                                   "name":  "37 - The Parting of the Ways.mp3"
                               },
                               {
                                   "id":  "1UlYZtYz2yd38i-aJ7xqsKwgBJyL7iKU8",
                                   "name":  "38 - The Beginning.mp3"
                               },
                               {
                                   "id":  "1z6zxEwQhIhfPCSy5V-AiQzBTM0shmwto",
                                   "name":  "39 - End Credits.mp3"
                               }
                           ],
              "coverId":  "18JXLjOzkGCL1AhzJ13xePgNf0gJK_ws9"
          },
    "6":  {
              "chapters":  [
                               {
                                   "id":  "15OGqYjRfySwqhMtasEGYcn_wnTlNWEVv",
                                   "name":  "01 - Opening Credits.mp3"
                               },
                               {
                                   "id":  "1ZYFwy2UdycCVC5iqypKzndJUrY2rSea6",
                                   "name":  "02 - The Other Minister.mp3"
                               },
                               {
                                   "id":  "1e78fpKVdHaKHg6MI02Z3PEScyYiA-gsX",
                                   "name":  "05 - Horace Slughorn.mp3"
                               },
                               {
                                   "id":  "1b85YIu5IiRrLlaUL6giNVx5F95lSo_FS",
                                   "name":  "06 - An Excess of Phlegm.mp3"
                               },
                               {
                                   "id":  "1oatFinyZW9DKWnFQq0eHEcWv56ssnnFG",
                                   "name":  "08 - The Slug Club.mp3"
                               },
                               {
                                   "id":  "1qJvxBXKwK4ecqkVYr-jG0TfFROeaKqig",
                                   "name":  "09 - Snape Victorious.mp3"
                               },
                               {
                                   "id":  "1Rw6DfP_PU06p3Vxd_BnGF4_8iXnyh7qC",
                                   "name":  "10 - The Half-Blood Prince.mp3"
                               },
                               {
                                   "id":  "1q6gX1BuiTwJ0KimPfU_3LY201DEPhfbO",
                                   "name":  "11 - The House of Gaunt.mp3"
                               },
                               {
                                   "id":  "1nLRfvx1_v2WyARmoD42iRjfgULXTDgVt",
                                   "name":  "13 - Silver and Opals.mp3"
                               },
                               {
                                   "id":  "1Mr7gZVWARVb9KDMl5nW3qxjW7ux1lPZI",
                                   "name":  "14 - The Secret Riddle.mp3"
                               },
                               {
                                   "id":  "1jubxihV-opf8Zpqhm3KB8Mdv8kyIvLeu",
                                   "name":  "15 - Felix Felicis.mp3"
                               },
                               {
                                   "id":  "1eEN4tp2dWb-y_rIB5QRNalOgbSRL-Zf3",
                                   "name":  "16 - The Unbreakable Vow.mp3"
                               },
                               {
                                   "id":  "13BiuIkoknf7gnxpq8xKllTv-4bGpSyGG",
                                   "name":  "17 - A Very Frosty Christmas.mp3"
                               },
                               {
                                   "id":  "1_e8g7apJ58uZ69VXKqIJi90fIuxBbVsv",
                                   "name":  "18 - A Sluggish Memory.mp3"
                               },
                               {
                                   "id":  "19bQ29FaYI_mEIQ-rpuFKH0kUXIuAJYU4",
                                   "name":  "19 - Birthday Surprises.mp3"
                               },
                               {
                                   "id":  "1fh1UKEVpaYhO4f1gk80Mxbl-EwnybMTd",
                                   "name":  "20 - Elf Tails.mp3"
                               },
                               {
                                   "id":  "1CXuJw98y97sqZ5KYYp0OxKve8xOtp8xX",
                                   "name":  "22 - The Unknowable Room.mp3"
                               },
                               {
                                   "id":  "1VKjO5KD1nDpx9E3TnKY3o4Ok9IDcxZmK",
                                   "name":  "23 - After the Burial.mp3"
                               },
                               {
                                   "id":  "1fXGg5jVIAGMHGg3b_2tEtdvugjZ4sDNy",
                                   "name":  "24 - Horcruxes.mp3"
                               },
                               {
                                   "id":  "15_wdT7tMltOo6Y2TVvqS-v9ij5qy7Jke",
                                   "name":  "25 - Sectumsempra.mp3"
                               },
                               {
                                   "id":  "14WcBHfe5TUPZblCFHmvNpWjeMO3GoSb9",
                                   "name":  "26 - The Seer Overheard.mp3"
                               },
                               {
                                   "id":  "1OpgBswipA1-j7Dmny3qLqTlATYYUTiks",
                                   "name":  "27 - The Cave.mp3"
                               },
                               {
                                   "id":  "1BD2fI5gQK6nnNFIDAlLMJRz-BbZmG4hk",
                                   "name":  "28 - The Lightning-Struck Tower.mp3"
                               },
                               {
                                   "id":  "1IJVa812dCfSwuCzQbAcaFXFDQZk4YODh",
                                   "name":  "29 - Flight of the Prince.mp3"
                               },
                               {
                                   "id":  "1I_E0LFetO7yhQxCpjz2WkFiJIfTEydKm",
                                   "name":  "30 - The Phoenix Lament.mp3"
                               },
                               {
                                   "id":  "1vMrjbSRymAVoxNpEkGinQP0lyw1yLDR7",
                                   "name":  "31 - The White Tomb.mp3"
                               },
                               {
                                   "id":  "1Is0XwW0w2p4e-dOlhX-d3y5Ne_uufBpe",
                                   "name":  "32 - End Credits.mp3"
                               }
                           ],
              "coverId":  "1uwgXsvtjE6oUbOUHaMPcr5rNsK8YUT20"
          },
    "5":  {
              "chapters":  [
                               {
                                   "id":  "1QSwuBiZuH-cZM7aHefWtfxRFKSAkPsJk",
                                   "name":  "01 - Opening Credits.mp3"
                               },
                               {
                                   "id":  "1ffL7mVy-ol-_AoD09X1fti1tCABubOJ-",
                                   "name":  "02 - Dudley Demented.mp3"
                               },
                               {
                                   "id":  "1jjBz0VNyiIRQWj6uyn5d3z6nuRNRYAwK",
                                   "name":  "03 - A Peck of Owls.mp3"
                               },
                               {
                                   "id":  "1LaatpnQnTDSv5XANA5wNmWmle5opca9Y",
                                   "name":  "04 - The Advance Guard.mp3"
                               },
                               {
                                   "id":  "1jbc0bGA73llVhoFszSuPGykJ959UWRxD",
                                   "name":  "05 - Number Twelve, Grimmauld Place.mp3"
                               },
                               {
                                   "id":  "137g_d17QtQ_EOPP4bOyeiP3b9cdP4IBe",
                                   "name":  "06 - The Order of the Phoenix.mp3"
                               },
                               {
                                   "id":  "1vEOYrHtgJmLhdJcThxqD6sMQiKPDM8dD",
                                   "name":  "07 - The Noble and Most Ancient House of Black.mp3"
                               },
                               {
                                   "id":  "1G3kKcsjcU_JLULjMYWJ8NNvuyaM6oSOg",
                                   "name":  "08 - The Ministry of Magic.mp3"
                               },
                               {
                                   "id":  "1t1GJyhS0woDS0R4-t7pKIIrPIGRTrtoA",
                                   "name":  "09 - The Hearing.mp3"
                               },
                               {
                                   "id":  "14pSDpIjiI49aTBbgo38eoSunJRpD2gBq",
                                   "name":  "10 - The Woes of Mrs Weasley.mp3"
                               },
                               {
                                   "id":  "1_n6FF9Eahc7Av7CxmprHSMoS8hL9Lul2",
                                   "name":  "11 - Luna Lovegood.mp3"
                               },
                               {
                                   "id":  "1uS9qn3JCJSnT8ZunLnOEO622iV0hCwA5",
                                   "name":  "13 - Professor Umbridge.mp3"
                               },
                               {
                                   "id":  "1isXzhcdws4DZ_jouCXMhePYEhTiD2PWq",
                                   "name":  "14 - Detention with Dolores.mp3"
                               },
                               {
                                   "id":  "1bo-gOFRFnvHIrkSLaUrOl7s0_KTlmL4p",
                                   "name":  "15 - Percy and Padfoot.mp3"
                               },
                               {
                                   "id":  "1bChcNXsDy5NBtCNknSIQ6CQdP9F3q4Mf",
                                   "name":  "16 - The Hogwarts High Inquisitor.mp3"
                               },
                               {
                                   "id":  "1ifht4uXZ0TdVeC6vwrCzRxYv_riJjaTZ",
                                   "name":  "18 - Educational Decree Number Twenty-Four.mp3"
                               },
                               {
                                   "id":  "1lj5X8jxoMb83xz3cjve852FTEnbsq3O7",
                                   "name":  "20 - The Lion and the Serpent.mp3"
                               },
                               {
                                   "id":  "1ufkjSa7XnGd-A3b0Jx-Hi2twOdrS4dPA",
                                   "name":  "22 - The Eye of the Snake.mp3"
                               },
                               {
                                   "id":  "1o2HD8hS3PZRrXeVAHB1cju6gT9Bm4o6z",
                                   "name":  "24 - Christmas on the Closed Ward.mp3"
                               },
                               {
                                   "id":  "1GgLGUQq-fKajc0uNinuU7jVksWBwKbI8",
                                   "name":  "25 - Occlumency.mp3"
                               },
                               {
                                   "id":  "1iLFH5UFPMnh6csbXMEM3L8dp2PqQjThg",
                                   "name":  "26 - The Beetle at Bay.mp3"
                               },
                               {
                                   "id":  "1RpY9BYarYTGQpYmRzAKgjfdyrS-XFODG",
                                   "name":  "27 - Seen and Unforeseen.mp3"
                               },
                               {
                                   "id":  "19YyCh7hoc7TZ9gidpnG88BWWYs892CBB",
                                   "name":  "28 - The Centaur and the Sneak.mp3"
                               },
                               {
                                   "id":  "1-WJt7x9ApJqDpMYrZDWpfnI-d8N5dQMC",
                                   "name":  "30 - Careers Advice.mp3"
                               },
                               {
                                   "id":  "1KDqxA7ERYyS9I6FxBt38FEZZoQoH6WAm",
                                   "name":  "31 - Grawp.mp3"
                               },
                               {
                                   "id":  "1gb9lnYMhSETvtbvf4XalhM9aU75fk_Dl",
                                   "name":  "32 - O.W.L.s.mp3"
                               },
                               {
                                   "id":  "1uecFA2_2g879viD_Lksu86G-GW9vxcGo",
                                   "name":  "33 - Out of the Fire.mp3"
                               },
                               {
                                   "id":  "1zH-5-xKmcwL79iLmj5S7DM-wUYlwEuLM",
                                   "name":  "34 - Fight and Flight.mp3"
                               },
                               {
                                   "id":  "14xumsoPTY-GkBcQtLxLDSkPPkZ0bxxaa",
                                   "name":  "35 - The Department of Mysteries.mp3"
                               },
                               {
                                   "id":  "1kwUuZ90UC3h6l-3TkT7bRyLnDnknR5oW",
                                   "name":  "36 - Beyond the Veil.mp3"
                               },
                               {
                                   "id":  "1mtzL9d29KPfOvjPSwVuy8W3f-cfHwCk4",
                                   "name":  "37 - The Only One He Ever Feared.mp3"
                               },
                               {
                                   "id":  "1MSBnSg-JR2xmC99E2Lo7BEcIp2SO4DMI",
                                   "name":  "38 - The Lost Prophecy.mp3"
                               },
                               {
                                   "id":  "1GDtQF3H4O3mXbYzSp2ev4_rCB2okYxjj",
                                   "name":  "39 - The Second War Begins.mp3"
                               },
                               {
                                   "id":  "1wpXB9nSDtPO6HaVvoqVWqn9njHwoSx6Y",
                                   "name":  "40 - End Credits.mp3"
                               }
                           ],
              "coverId":  "1Uhy4u0ptsPe-R04eYlvTWT7ztXGx89ki"
          }
}
;

const PDF_FILE_ID = "1mz_c0QzAftpij4DbZ4EEEcmV7Lh_BTdb";

// Global Application State
const state = {
  books: {
    1: { name: "1. Philosopher's Stone", chapters: [], coverUrl: null },
    2: { name: "2. The Chamber of Secrets", chapters: [], coverUrl: null },
    3: { name: "3. The Prisoner of Azkaban", chapters: [], coverUrl: null },
    4: { name: "4. Goblet of Fire", chapters: [], coverUrl: null },
    5: { name: "5. Order of the Phoenix", chapters: [], coverUrl: null },
    6: { name: "6. Half-Blood Prince", chapters: [], coverUrl: null },
    7: { name: "7. Deathly Hallows", chapters: [], coverUrl: null }
  },
  pdfDoc: null,
  activeBookId: null,
  activeChapterIndex: null,
  isPlaying: false,
  audioContext: null,
  analyser: null,
  isAudioInitialized: false,
  
  // Subtitles State
  currentChapterText: '',
  paragraphs: [],
  syncOffset: 0,
  subtitleActiveIndex: -1,
  pdfChapterPagesCache: {},
  
  bookPageRanges: {
    1: { start: 1, end: 350 },
    2: { start: 300, end: 700 },
    3: { start: 650, end: 1150 },
    4: { start: 1100, end: 1950 },
    5: { start: 1850, end: 2850 },
    6: { start: 2750, end: 3550 },
    7: { start: 3450, end: 4300 }
  }
};

// CORS Proxy for PDF and Audio Analysis
const CORS_PROXY = "https://corsproxy.io/?";

// UI Elements
const bookTabsContainer = document.getElementById('bookTabsContainer');
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentTimeLabel = document.getElementById('currentTime');
const durationLabel = document.getElementById('duration');
const progressWrapper = document.getElementById('progressWrapper');
const progressFill = document.getElementById('progressFill');
const progressHandle = document.getElementById('progressHandle');

const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const volumeSlider = document.getElementById('volumeSlider');
const muteBtn = document.getElementById('muteBtn');

const activeBookTag = document.getElementById('activeBookTag');
const activeChapterTag = document.getElementById('activeChapterTag');
const nowPlayingTitle = document.getElementById('nowPlayingTitle');
const nowPlayingSubtitle = document.getElementById('nowPlayingSubtitle');
const nowPlayingCover = document.getElementById('nowPlayingCover');
const coverArtContainer = document.getElementById('coverArtContainer');

const chaptersListHeaderTitle = document.getElementById('chaptersListHeaderTitle');
const chaptersList = document.getElementById('chaptersList');

// Subtitle tab elements
const subtitlesContainer = document.getElementById('subtitlesContainer');
const subtitlesViewport = document.getElementById('subtitlesViewport');
const pdfLoadingIndicator = document.getElementById('pdfLoadingIndicator');
const offsetSlider = document.getElementById('offsetSlider');
const offsetValue = document.getElementById('offsetValue');
const manualPageInput = document.getElementById('manualPageInput');
const loadPageBtn = document.getElementById('loadPageBtn');
const pdfSearchInput = document.getElementById('pdfSearchInput');

// Drawer elements
const floatingDrawerBtn = document.getElementById('floatingDrawerBtn');
const drawerOverlay = document.getElementById('drawerOverlay');
const closeDrawerBtn = document.getElementById('closeDrawerBtn');
const drawerBookSelect = document.getElementById('drawerBookSelect');
const drawerChaptersList = document.getElementById('drawerChaptersList');

// Visualizer canvas
const visualizerCanvas = document.getElementById('visualizerCanvas');
const largeVisualizerCanvas = document.getElementById('largeVisualizerCanvas');
const visualizerThemeSelect = document.getElementById('visualizerThemeSelect');
const particleCountSlider = document.getElementById('particleCountSlider');

// Seek overlays
const seekLeftIndicator = document.getElementById('seekLeftIndicator');
const seekRightIndicator = document.getElementById('seekRightIndicator');

// Set PDF.js Global Worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// ==========================================
// Initialization
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  initLibrary();
  loadCombinedPDF();
});

function initLibrary() {
  // Parse driveData and populate state
  for (let key in driveData) {
    const bookId = parseInt(key);
    const data = driveData[key];
    const book = state.books[bookId];
    
    if (data.coverId) {
      book.coverUrl = https://docs.google.com/uc?export=download&id=\;
    }
    
    book.chapters = data.chapters.map(ch => ({
      name: ch.name,
      id: ch.id,
      url: https://docs.google.com/uc?export=download&id=\
    }));
  }

  // Show dashboard and floating drawers
  document.getElementById('welcomeScreen').style.display = 'none';
  document.getElementById('playerDashboard').style.display = 'grid';
  floatingDrawerBtn.style.display = 'flex';

  renderBookTabs();
  initDrawerSelectors();

  // Load first chapter
  selectBook(1);
}

// Load the PDF from Google Drive in the background (CORS-bypassed)
async function loadCombinedPDF() {
  try {
    pdfLoadingIndicator.style.display = 'block';
    updateSubtitlesPlaceholder("Fetching and loading Harry Potter book PDF from Google Drive...");
    
    const pdfUrl = \\;
    
    state.pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
    console.log(PDF Loaded! Total Pages: \);
    pdfLoadingIndicator.style.display = 'none';
    updateSubtitlesPlaceholder("PDF loaded successfully. Subtitles will sync as you play chapters.");
  } catch (err) {
    console.error('Error fetching PDF:', err);
    pdfLoadingIndicator.style.display = 'none';
    updateSubtitlesPlaceholder("Failed to download PDF from Google Drive. Subtitles are unavailable.");
  }
}

function updateSubtitlesPlaceholder(message) {
  subtitlesContainer.innerHTML = 
    <div class="subtitles-placeholder">
      <i class="fa-solid fa-book-open-reader"></i>
      <p>\</p>
    </div>
  ;
}

function renderBookTabs() {
  bookTabsContainer.innerHTML = '';
  
  for (let key in state.books) {
    const bookId = parseInt(key);
    const book = state.books[bookId];

    const tab = document.createElement('div');
    tab.className = ook-tab \;
    tab.dataset.id = bookId;
    
    let coverHtml = '';
    if (book.coverUrl) {
      // Direct load cover from Drive
      coverHtml = <img src="\" class="tab-cover-thumbnail" alt="\">;
    } else {
      coverHtml = <div class="tab-cover-thumbnail fallback-cover" style="background: var(--color-burgundy); border: 1px dashed var(--color-gold); display:flex; align-items:center; justify-content:center; color: var(--color-gold); font-size: 0.8rem; font-family: var(--font-magic);">HP\</div>;
    }

    tab.innerHTML = 
      \
      <div class="tab-details">
        <span class="tab-num">Book \</span>
        <span class="tab-name">\</span>
      </div>
    ;

    tab.addEventListener('click', () => selectBook(bookId));
    bookTabsContainer.appendChild(tab);
  }
}

function selectBook(bookId) {
  state.activeBookId = bookId;
  
  document.querySelectorAll('.book-tab').forEach(tab => {
    tab.classList.toggle('active', parseInt(tab.dataset.id) === bookId);
  });

  renderChaptersList();
  chaptersListHeaderTitle.textContent = \ - Chapter List;
  
  if (state.activeChapterIndex === null || state.activeBookId !== bookId) {
    selectChapter(0, false);
  }
}

function renderChaptersList() {
  chaptersList.innerHTML = '';
  const chapters = state.books[state.activeBookId].chapters;

  chapters.forEach((ch, index) => {
    const item = document.createElement('div');
    const isActive = (state.activeBookId === state.activeBookId && state.activeChapterIndex === index);
    item.className = chapter-item \;
    
    let displayTitle = ch.name.replace(/\.[^/.]+$/, "");
    displayTitle = displayTitle.replace(/^\d+[-_\s]*/, "");

    item.innerHTML = 
      <span class="chapter-num">\</span>
      <span class="chapter-name" title="\">\</span>
      <span class="chapter-play-indicator"><i class="fa-solid fa-volume-high"></i></span>
    ;

    item.addEventListener('click', () => {
      document.querySelectorAll('.chapter-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      selectChapter(index, true);
    });

    chaptersList.appendChild(item);
  });
}

function selectChapter(chapterIndex, shouldPlay = true) {
  const book = state.books[state.activeBookId];
  if (!book || book.chapters.length === 0) return;

  state.activeChapterIndex = chapterIndex;
  const ch = book.chapters[chapterIndex];

  // Set audio source to Google Drive direct link
  // To allow Canvas visualization, we load audio via CORS proxy if it fails or use directly.
  // We try loading through CORS proxy so Web Audio API doesn't throw a cross-origin error.
  const audioUrl = \\&url=\;
  audioPlayer.crossOrigin = "anonymous";
  
  // Set source
  audioPlayer.src = ch.url; // Use direct Google Drive URL as standard source

  // Let's add an error listener to fallback if proxy or direct download has issues
  audioPlayer.onerror = (e) => {
    console.warn("Audio load error, retrying without CORS proxy...", e);
    audioPlayer.removeAttribute("crossOrigin");
    audioPlayer.src = ch.url;
  };

  let title = ch.name.replace(/\.[^/.]+$/, "");
  title = title.replace(/^\d+[-_\s]*/, "");
  
  activeBookTag.textContent = Book \;
  activeChapterTag.textContent = Chapter \;
  nowPlayingTitle.textContent = title;
  nowPlayingSubtitle.textContent = book.name.replace(/^\d\.\s+/, '');
  
  if (book.coverUrl) {
    nowPlayingCover.src = book.coverUrl;
    nowPlayingCover.className = "now-playing-cover";
  } else {
    generateCoverFallback(state.activeBookId, book.name.replace(/^\d\.\s+/, ''));
  }

  const chapterItems = chaptersList.children;
  if (chapterItems && chapterItems[chapterIndex]) {
    Array.from(chapterItems).forEach(item => item.classList.remove('active'));
    chapterItems[chapterIndex].classList.add('active');
    chapterItems[chapterIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  loadChapterSubtitles(title, chapterIndex + 1);
  setupMediaSession(title, book.name.replace(/^\d\.\s+/, ''));

  if (shouldPlay) {
    playAudio();
  } else {
    pauseAudio();
  }
}

function generateCoverFallback(bookId, bookName) {
  const container = document.getElementById('coverArtContainer');
  const oldCard = container.querySelector('.fallback-card');
  if (oldCard) oldCard.remove();

  const card = document.createElement('div');
  card.className = 'fallback-card';
  card.innerHTML = 
    <div class="fallback-decor">âœ¦ âœ¦ âœ¦</div>
    <div>
      <div style="font-size: 0.85rem; letter-spacing: 2px; color: var(--color-gold); font-family: var(--font-magic); margin-bottom:5px;">HARRY POTTER</div>
      <div class="fallback-title">\</div>
    </div>
    <div class="fallback-author">J.K. ROWLING</div>
  ;
  
  nowPlayingCover.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="3" height="4"></svg>';
  nowPlayingCover.className = "now-playing-cover fallback-cover";
  container.appendChild(card);
}

function playAudio() {
  if (!state.isAudioInitialized) {
    initWebAudio();
  }

  audioPlayer.play()
    .then(() => {
      state.isPlaying = true;
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      if ('mediaSession' in navigator) navigator.mediaSession.playbackState = "playing";
    })
    .catch(err => {
      console.log('Play failed, user interaction may be required:', err);
    });
}

function pauseAudio() {
  audioPlayer.pause();
  state.isPlaying = false;
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  if ('mediaSession' in navigator) navigator.mediaSession.playbackState = "paused";
}

playBtn.addEventListener('click', () => {
  if (state.isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
});

prevBtn.addEventListener('click', playPreviousChapter);
nextBtn.addEventListener('click', playNextChapter);

function playPreviousChapter() {
  if (state.activeChapterIndex > 0) {
    selectChapter(state.activeChapterIndex - 1, true);
  } else if (state.activeBookId > 1) {
    let prevBookId = state.activeBookId - 1;
    while (prevBookId >= 1 && state.books[prevBookId].chapters.length === 0) {
      prevBookId--;
    }
    if (prevBookId >= 1) {
      selectBook(prevBookId);
      selectChapter(state.books[prevBookId].chapters.length - 1, true);
    }
  }
}

function playNextChapter() {
  const chapters = state.books[state.activeBookId].chapters;
  if (state.activeChapterIndex < chapters.length - 1) {
    selectChapter(state.activeChapterIndex + 1, true);
  } else {
    let nextBookId = state.activeBookId + 1;
    while (nextBookId <= 7 && state.books[nextBookId].chapters.length === 0) {
      nextBookId++;
    }
    if (nextBookId <= 7) {
      selectBook(nextBookId);
      selectChapter(0, true);
    } else {
      pauseAudio();
    }
  }
}

audioPlayer.addEventListener('ended', () => {
  playNextChapter();
});

audioPlayer.addEventListener('timeupdate', () => {
  if (audioPlayer.duration) {
    const curTime = audioPlayer.currentTime;
    const dur = audioPlayer.duration;
    
    const pct = (curTime / dur) * 100;
    progressFill.style.width = \%;
    progressHandle.style.left = \%;

    currentTimeLabel.textContent = formatTime(curTime);
    durationLabel.textContent = formatTime(dur);

    updateSubtitleHighlight(curTime);
  }
});

audioPlayer.addEventListener('loadedmetadata', () => {
  durationLabel.textContent = formatTime(audioPlayer.duration || 0);
  progressFill.style.width = '0%';
  progressHandle.style.left = '0%';
});

function formatTime(secs) {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = Math.floor(secs % 60);
  const padSecs = seconds < 10 ? '0' + seconds : seconds;
  
  if (hours > 0) {
    const padMins = minutes < 10 ? '0' + minutes : minutes;
    return \:\:\;
  }
  return \:\;
}

progressWrapper.addEventListener('click', (e) => {
  if (!audioPlayer.duration) return;
  const rect = progressWrapper.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const pct = Math.max(0, Math.min(1, clickX / rect.width));
  audioPlayer.currentTime = pct * audioPlayer.duration;
});

speedSlider.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  speedValue.textContent = val.toFixed(1) + 'x';
  audioPlayer.playbackRate = val;
});

let preMuteVolume = 0.8;
volumeSlider.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  audioPlayer.volume = val;
  audioPlayer.muted = (val === 0);
  updateVolumeIcon(val);
});

muteBtn.addEventListener('click', () => {
  if (audioPlayer.muted) {
    audioPlayer.muted = false;
    audioPlayer.volume = preMuteVolume;
    volumeSlider.value = preMuteVolume;
    updateVolumeIcon(preMuteVolume);
  } else {
    preMuteVolume = audioPlayer.volume;
    audioPlayer.muted = true;
    audioPlayer.volume = 0;
    volumeSlider.value = 0;
    updateVolumeIcon(0);
  }
});

function updateVolumeIcon(val) {
  if (val === 0) {
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else if (val < 0.4) {
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
  } else {
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  }
}

coverArtContainer.addEventListener('dblclick', (e) => {
  if (!audioPlayer.duration) return;
  const rect = coverArtContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const containerWidth = rect.width;
  
  if (clickX < containerWidth / 2) {
    audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
    triggerSeekIndicator(seekLeftIndicator);
  } else {
    audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
    triggerSeekIndicator(seekRightIndicator);
  }
});

function triggerSeekIndicator(element) {
  element.classList.remove('show');
  void element.offsetWidth;
  element.classList.add('show');
  setTimeout(() => element.classList.remove('show'), 600);
}

// ==========================================
// Media Session API
// ==========================================
function setupMediaSession(chapterTitle, bookName) {
  if ('mediaSession' in navigator) {
    const book = state.books[state.activeBookId];
    
    const artwork = [];
    if (book.coverUrl) {
      artwork.push({ src: book.coverUrl, sizes: '512x512', type: 'image/png' });
    } else {
      artwork.push({ src: 'assets/icon.png', sizes: '512x512', type: 'image/png' });
    }

    navigator.mediaSession.metadata = new MediaMetadata({
      title: chapterTitle,
      artist: 'J.K. Rowling',
      album: bookName,
      artwork: artwork
    });

    navigator.mediaSession.setActionHandler('play', playAudio);
    navigator.mediaSession.setActionHandler('pause', pauseAudio);
    navigator.mediaSession.setActionHandler('previoustrack', playPreviousChapter);
    navigator.mediaSession.setActionHandler('nexttrack', playNextChapter);
    
    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
      const seekOffset = details.seekOffset || 10;
      audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - seekOffset);
    });
    
    navigator.mediaSession.setActionHandler('seekforward', (details) => {
      const seekOffset = details.seekOffset || 10;
      audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + seekOffset);
    });

    try {
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        audioPlayer.currentTime = details.seekTime;
      });
    } catch(err) {}
  }
}

// ==========================================
// PDF Text Extraction & Synchronized Subtitles
// ==========================================

async function loadChapterSubtitles(chapterTitle, chapterNum) {
  if (!state.pdfDoc) return;

  pdfLoadingIndicator.style.display = 'block';
  subtitlesContainer.innerHTML = '';
  state.paragraphs = [];
  
  try {
    let startPage = await findChapterPageInPDF(chapterTitle, chapterNum);
    console.log(Found chapter on page: \);
    
    if (startPage > 0) {
      manualPageInput.value = startPage;
      await extractAndDisplaySubtitles(startPage);
    } else {
      updateSubtitlesPlaceholder(Could not automatically locate page in PDF. Please enter starting page below.);
      pdfLoadingIndicator.style.display = 'none';
    }
  } catch (err) {
    console.error('Error extracting subtitles:', err);
    updateSubtitlesPlaceholder("Error extracting text from PDF file.");
    pdfLoadingIndicator.style.display = 'none';
  }
}

async function findChapterPageInPDF(chapterTitle, chapterNum) {
  const range = state.bookPageRanges[state.activeBookId] || { start: 1, end: state.pdfDoc.numPages };
  
  const cleanTitle = chapterTitle.toLowerCase().replace(/[^a-z0-9]/g, " ").trim();
  const searchWords = cleanTitle.split(/\s+/).filter(w => w.length > 2);
  
  const cacheKey = \_\;
  if (state.pdfChapterPagesCache[cacheKey]) {
    return state.pdfChapterPagesCache[cacheKey];
  }

  console.log(Searching chapter title inside pages \ to \...);
  
  for (let pageNum = range.start; pageNum <= range.end; pageNum++) {
    if (pageNum > state.pdfDoc.numPages) break;
    
    const page = await state.pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ').toLowerCase();

    const hasChapterHeading = pageText.includes("chapter") && 
      (pageText.includes( \ ) || pageText.includes( \ ) || pageText.includes( \ ));

    let keywordMatches = 0;
    searchWords.forEach(word => {
      if (pageText.includes(word)) keywordMatches++;
    });

    const isMatch = hasChapterHeading || (searchWords.length > 0 && keywordMatches >= Math.min(3, searchWords.length));
    
    if (isMatch) {
      state.pdfChapterPagesCache[cacheKey] = pageNum;
      return pageNum;
    }
  }
  
  return -1;
}

function numberToRoman(num) {
  const roman = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
  let str = '';
  for (let i in roman ) {
    while ( num >= roman[i] ) {
      str += i;
      num -= roman[i];
    }
  }
  return str.toLowerCase();
}

function numberToEnglish(num) {
  const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  return words[num] || "";
}

async function extractAndDisplaySubtitles(startPage) {
  subtitlesContainer.innerHTML = '';
  state.paragraphs = [];
  
  let pageOffset = 0;
  let fullText = '';
  let chapterEndDetected = false;
  
  while (pageOffset < 25 && (startPage + pageOffset) <= state.pdfDoc.numPages && !chapterEndDetected) {
    const currentPageNum = startPage + pageOffset;
    const page = await state.pdfDoc.getPage(currentPageNum);
    const textContent = await page.getTextContent();
    
    let lastY = -1;
    let pageText = '';
    
    textContent.items.forEach(item => {
      if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 12) {
        pageText += '\n';
      }
      pageText += item.str + ' ';
      lastY = item.transform[5];
    });

    if (pageOffset > 0) {
      const pageLower = pageText.toLowerCase();
      if (pageLower.includes("chapter") && (pageLower.includes("chapter one") || pageLower.includes("chapter 1") || pageLower.includes("chapter i") || pageLower.match(/chapter\s+\d+/))) {
        chapterEndDetected = true;
        break;
      }
    }

    fullText += pageText + '\n';
    pageOffset++;
  }

  const lines = fullText.split(/\n+/).map(l => l.trim()).filter(l => l.length > 15);
  
  if (lines.length === 0) {
    updateSubtitlesPlaceholder("Extracted pages were blank or contain unreadable formats.");
    pdfLoadingIndicator.style.display = 'none';
    return;
  }

  const duration = audioPlayer.duration || 1800;
  const count = lines.length;
  const timePerPara = duration / count;

  lines.forEach((text, index) => {
    state.paragraphs.push({
      text: text,
      estimatedStart: index * timePerPara,
      estimatedEnd: (index + 1) * timePerPara
    });
  });

  renderSubtitles();
  pdfLoadingIndicator.style.display = 'none';
}

function renderSubtitles() {
  subtitlesContainer.innerHTML = '';
  
  state.paragraphs.forEach((p, index) => {
    const el = document.createElement('p');
    el.className = 'subtitle-para';
    el.textContent = p.text;
    el.dataset.index = index;
    
    el.addEventListener('click', () => {
      if (audioPlayer.duration) {
        const time = p.estimatedStart + state.syncOffset;
        audioPlayer.currentTime = Math.max(0, Math.min(audioPlayer.duration, time));
      }
    });

    el.addEventListener('dblclick', () => {
      if (audioPlayer.duration) {
        const curAudioTime = audioPlayer.currentTime;
        const estimatedTime = p.estimatedStart;
        state.syncOffset = curAudioTime - estimatedTime;
        offsetSlider.value = state.syncOffset;
        offsetValue.textContent = (state.syncOffset >= 0 ? '+' : '') + state.syncOffset.toFixed(1) + 's';
        
        recalculateSubtitleTimings(index, curAudioTime);
      }
    });

    subtitlesContainer.appendChild(el);
  });
}

function recalculateSubtitleTimings(anchorIndex, anchorTime) {
  const duration = audioPlayer.duration;
  const totalParas = state.paragraphs.length;
  
  if (anchorIndex === 0) {
    const remainingTime = duration - anchorTime;
    const timePerPara = remainingTime / (totalParas - 1);
    
    state.paragraphs.forEach((p, index) => {
      p.estimatedStart = anchorTime + (index * timePerPara);
      p.estimatedEnd = anchorTime + ((index + 1) * timePerPara);
    });
  } else if (anchorIndex === totalParas - 1) {
    const timePerPara = anchorTime / (totalParas - 1);
    state.paragraphs.forEach((p, index) => {
      p.estimatedStart = index * timePerPara;
      p.estimatedEnd = (index + 1) * timePerPara;
    });
  } else {
    const leftCount = anchorIndex;
    const rightCount = totalParas - 1 - anchorIndex;
    
    const leftTimePerPara = anchorTime / leftCount;
    const rightTimePerPara = (duration - anchorTime) / rightCount;
    
    state.paragraphs.forEach((p, index) => {
      if (index <= anchorIndex) {
        p.estimatedStart = index * leftTimePerPara;
        p.estimatedEnd = (index + 1) * leftTimePerPara;
      } else {
        const offset = index - anchorIndex;
        p.estimatedStart = anchorTime + (offset * rightTimePerPara);
        p.estimatedEnd = anchorTime + ((offset + 1) * rightTimePerPara);
      }
    });
  }
}

offsetSlider.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  state.syncOffset = val;
  offsetValue.textContent = (val >= 0 ? '+' : '') + val.toFixed(1) + 's';
});

loadPageBtn.addEventListener('click', () => {
  const val = parseInt(manualPageInput.value);
  if (state.pdfDoc && val >= 1 && val <= state.pdfDoc.numPages) {
    pdfLoadingIndicator.style.display = 'block';
    extractAndDisplaySubtitles(val);
  }
});

function updateSubtitleHighlight(time) {
  if (state.paragraphs.length === 0) return;
  
  const adjustedTime = time - state.syncOffset;
  let activeIndex = -1;

  for (let i = 0; i < state.paragraphs.length; i++) {
    if (adjustedTime >= state.paragraphs[i].estimatedStart && adjustedTime < state.paragraphs[i].estimatedEnd) {
      activeIndex = i;
      break;
    }
  }

  if (activeIndex !== -1 && activeIndex !== state.subtitleActiveIndex) {
    state.subtitleActiveIndex = activeIndex;
    
    const paras = subtitlesContainer.children;
    Array.from(paras).forEach((el, index) => {
      el.classList.toggle('active', index === activeIndex);
    });

    const activeEl = paras[activeIndex];
    if (activeEl) {
      const viewportHeight = subtitlesViewport.clientHeight;
      const scrollTarget = activeEl.offsetTop - (viewportHeight / 2) + (activeEl.clientHeight / 2);
      subtitlesViewport.scrollTo({
        top: Math.max(0, scrollTarget),
        behavior: 'smooth'
      });
    }
  }
}

pdfSearchInput.addEventListener('input', (e) => {
  const keyword = e.target.value.toLowerCase().trim();
  const paras = subtitlesContainer.children;
  if (!paras) return;

  Array.from(paras).forEach((el, index) => {
    const text = state.paragraphs[index].text.toLowerCase();
    if (keyword.length > 1 && text.includes(keyword)) {
      el.style.borderRight = "3px solid var(--color-gold)";
      el.style.background = "rgba(212, 175, 55, 0.03)";
    } else {
      el.style.borderRight = "none";
      el.style.background = "";
    }
  });
});

// ==========================================
// Tabs Navigation
// ==========================================
document.querySelectorAll('.tab-header-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-header-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ==========================================
// Quick Selection Drawer Logic
// ==========================================

function initDrawerSelectors() {
  drawerBookSelect.innerHTML = '';
  for (let key in state.books) {
    const bookId = parseInt(key);
    const book = state.books[bookId];

    const opt = document.createElement('option');
    opt.value = bookId;
    opt.textContent = book.name;
    drawerBookSelect.appendChild(opt);
  }

  drawerBookSelect.addEventListener('change', (e) => {
    renderDrawerChapters(parseInt(e.target.value));
  });
}

function renderDrawerChapters(bookId) {
  drawerChaptersList.innerHTML = '';
  const chapters = state.books[bookId].chapters;

  chapters.forEach((ch, index) => {
    const item = document.createElement('div');
    const isActive = (state.activeBookId === bookId && state.activeChapterIndex === index);
    item.className = chapter-item \;
    
    let displayTitle = ch.name.replace(/\.[^/.]+$/, "");
    displayTitle = displayTitle.replace(/^\d+[-_\s]*/, "");

    item.innerHTML = 
      <span class="chapter-num">\</span>
      <span class="chapter-name">\</span>
      <span class="chapter-play-indicator"><i class="fa-solid fa-volume-high"></i></span>
    ;

    item.addEventListener('click', () => {
      selectBook(bookId);
      selectChapter(index, true);
      closeDrawer();
    });

    drawerChaptersList.appendChild(item);
  });
}

floatingDrawerBtn.addEventListener('click', () => {
  drawerOverlay.classList.add('open');
  drawerBookSelect.value = state.activeBookId;
  renderDrawerChapters(state.activeBookId);
});

[closeDrawerBtn, drawerOverlay].forEach(el => {
  el.addEventListener('click', (e) => {
    if (e.target === drawerOverlay || e.currentTarget === closeDrawerBtn) {
      closeDrawer();
    }
  });
});

function closeDrawer() {
  drawerOverlay.classList.remove('open');
}

// ==========================================
// Web Audio API & Particle Visualizer Logic
// ==========================================

let visualizerParticles = [];
let visualizerThemeColor = 'gold';
let particleCount = 150;
let animationFrameId = null;

function initWebAudio() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new AudioContextClass();
    
    state.analyser = state.audioContext.createAnalyser();
    state.analyser.fftSize = 256;
    
    const source = state.audioContext.createMediaElementSource(audioPlayer);
    source.connect(state.analyser);
    state.analyser.connect(state.audioContext.destination);
    
    state.isAudioInitialized = true;
    console.log("Web Audio Context successfully initialized!");
    
    startVisualizerLoop();
  } catch (err) {
    console.error("Failed to initialize Web Audio API:", err);
  }
}

function startVisualizerLoop() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);

  initParticles();
  resizeCanvases();
  window.addEventListener('resize', resizeCanvases);

  function draw() {
    animationFrameId = requestAnimationFrame(draw);
    
    const bufferLength = state.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    state.analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    const averageVolume = sum / bufferLength;

    drawCoverCanvas(dataArray, averageVolume);
    drawTabCanvas(dataArray, averageVolume);
  }

  draw();
}

function resizeCanvases() {
  [visualizerCanvas, largeVisualizerCanvas].forEach(canvas => {
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  });
}

function initParticles() {
  visualizerParticles = [];
  for (let i = 0; i < 300; i++) {
    visualizerParticles.push({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.002,
      speedY: (Math.random() - 0.5) * 0.002,
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * 0.02
    });
  }
}

function getThemeRGB(theme, alpha = 1) {
  const themes = {
    gold: gba(212, 175, 55, \),
    burgundy: gba(158, 27, 50, \),
    blue: gba(42, 117, 187, \),
    green: gba(46, 125, 50, \),
    purple: gba(142, 68, 173, \)
  };
  return themes[theme] || themes.gold;
}

function getThemeGlowRGB(theme) {
  const glows = {
    gold: '#ffeb3b',
    burgundy: '#ff1744',
    blue: '#29b6f6',
    green: '#66bb6a',
    purple: '#e040fb'
  };
  return glows[theme] || glows.gold;
}

function drawCoverCanvas(dataArray, averageVolume) {
  const ctx = visualizerCanvas.getContext('2d');
  const w = visualizerCanvas.width;
  const h = visualizerCanvas.height;
  
  ctx.clearRect(0, 0, w, h);
  
  if (!state.isPlaying) return;

  const count = Math.min(particleCount, 100);
  
  ctx.shadowBlur = 8;
  ctx.shadowColor = getThemeGlowRGB(visualizerThemeColor);

  for (let i = 0; i < count; i++) {
    const p = visualizerParticles[i];
    const volMod = 1 + (averageVolume / 100);
    p.x += p.speedX * volMod;
    p.y += p.speedY * volMod;

    if (p.x < 0) p.x = 1;
    if (p.x > 1) p.x = 0;
    if (p.y < 0) p.y = 1;
    if (p.y > 1) p.y = 0;

    const size = p.size * (1 + (averageVolume / 255) * 2);
    ctx.fillStyle = getThemeRGB(visualizerThemeColor, p.opacity);
    ctx.beginPath();
    ctx.arc(p.x * w, p.y * h, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.shadowBlur = 0;
}

function drawTabCanvas(dataArray, averageVolume) {
  const ctx = largeVisualizerCanvas.getContext('2d');
  const w = largeVisualizerCanvas.width;
  const h = largeVisualizerCanvas.height;
  
  ctx.clearRect(0, 0, w, h);
  
  const centerX = w / 2;
  const centerY = h / 2;
  const baseRadius = Math.min(w, h) * 0.25;
  const dynamicRadius = baseRadius + (averageVolume / 255) * 40;

  ctx.strokeStyle = getThemeRGB(visualizerThemeColor, 0.2);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, dynamicRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = getThemeRGB(visualizerThemeColor, 0.1);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(centerX, centerY, dynamicRadius * 1.2, 0, Math.PI * 2);
  ctx.stroke();

  const barCount = dataArray.length / 2;
  ctx.lineWidth = 3;
  ctx.strokeStyle = getThemeRGB(visualizerThemeColor, 0.8);
  ctx.shadowBlur = 10;
  ctx.shadowColor = getThemeGlowRGB(visualizerThemeColor);
  
  for (let i = 0; i < barCount; i++) {
    const freqVal = dataArray[i];
    const angle = (i / barCount) * Math.PI * 2;
    const spikeHeight = (freqVal / 255) * 120;
    
    const startX = centerX + Math.cos(angle) * dynamicRadius;
    const startY = centerY + Math.sin(angle) * dynamicRadius;
    const endX = centerX + Math.cos(angle) * (dynamicRadius + spikeHeight);
    const endY = centerY + Math.sin(angle) * (dynamicRadius + spikeHeight);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  ctx.shadowBlur = 5;
  for (let i = 0; i < particleCount; i++) {
    const p = visualizerParticles[i];
    const volMod = 1 + (averageVolume / 80);
    p.x += p.speedX * volMod;
    p.y += p.speedY * volMod;

    if (p.x < 0) p.x = 1;
    if (p.x > 1) p.x = 0;
    if (p.y < 0) p.y = 1;
    if (p.y > 1) p.y = 0;

    if (state.isPlaying) {
      const targetX = 0.5;
      const targetY = 0.5;
      p.x += (targetX - p.x) * 0.001 * (averageVolume / 100);
      p.y += (targetY - p.y) * 0.001 * (averageVolume / 100);
    }

    const size = p.size * (1 + (averageVolume / 255) * 1.5);
    ctx.fillStyle = getThemeRGB(visualizerThemeColor, p.opacity);
    ctx.beginPath();
    ctx.arc(p.x * w, p.y * h, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.shadowBlur = 0;
}

visualizerThemeSelect.addEventListener('change', (e) => {
  visualizerThemeColor = e.target.value;
});

particleCountSlider.addEventListener('input', (e) => {
  particleCount = parseInt(e.target.value);
});
