# 3CLOU

## Evaluation des spécifications techniques

On considère 2x20 étudiants, soit 40 étudiants au total.

Pour chaque étudiant on veut 4 VMs, on va considérer ces specs:

- 1 Bastion (0.5 Go RAM, 1 vCPU)
- 1 reverse proxy NGINX (0.5 Go RAM, 1 vCPU)
- 1 Apache + PHP (2 Go RAM, 1 vCPU)
- 1 MariaDB (2 Go RAM, 1 vCPU)

On a donc besoin de:

- RAM: 0.5 + 0.5 + 2 + 2 = 5 Go RAM par étudiant
- vCPU: 1 + 1 + 1 + 1 = 4 vCPU par étudiant

Pour 40 étudiants, on a besoin de:

- RAM: 5 Go * 40 = 200 Go RAM
- vCPU: 4 vCPU * 40 = 160 vCPU

Les briques logicielles (Debian, NGINX, Apache, MariaDB, Proxmox) sont open-source.

## On-Premise

TODO

## Cloud OVH

On se baserais sur plusieurs serveurs dédiés OVH avec Proxmox installé pour gérer les VMs.

On peut se baser sur l'offre (`ADVANCE-4`)[https://www.ovhcloud.com/fr/bare-metal/advance/adv-4] qui offre 32 vCPU et 64Gb de RAM pour 200€ par mois (installation gratuite à ce jour).

Pour 160 vCPU et 200 Go de RAM, on aurait besoin de 5 serveurs (160 vCPU / 32 vCPU par serveur = 5 serveurs) et (200 Go RAM / 64 Go RAM par serveur = 3.125 serveurs, arrondi à 4 serveurs).

Ce qui nous fait un budget mensuel de 5 serveurs * 200€ par serveur = 1000€ par mois.

