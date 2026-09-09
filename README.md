# DFR1216 MakeCode extension

Extension non officielle pour la carte **DFRobot DFR1216** avec micro:bit.

## Fonctions

- 4 moteurs DC, vitesse `-255..255`
  - positif = avant
  - négatif = arrière
  - 0 = arrêt
- arrêt d'un moteur
- arrêt des 4 moteurs
- lecture logique des broches micro:bit (`P0`, `P1`, `P2`, etc.)
- écriture logique sur les broches micro:bit
- configuration entrée/sortie

## Installation

Le dossier doit être placé dans un dépôt GitHub sous le nom `pxt-dfr1216`, puis dans MakeCode :

**Extensions → rechercher/entrer l'URL du dépôt GitHub**

Exemple :

`https://github.com/VOTRE_COMPTE/pxt-dfr1216`

## Matériel

Le protocole I²C utilisé est celui publié par DFRobot pour le DFR1216 :
adresse I²C `0x33`, registres moteurs à partir de `0x04`.

Référence officielle :
https://github.com/DFRobot/DFRobot_UnihikerExpansion

Cette extension est expérimentale et n'est pas publiée ni validée par DFRobot.
