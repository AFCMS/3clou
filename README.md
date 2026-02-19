# 3CLOU

## Evaluation des spécifications techniques

On considère 2x20 étudiants, soit 40 étudiants au total.

Pour chaque étudiant on veut 4 VMs, on va considérer ces specs:

- 1 Bastion (0.5 Go RAM, 1 vCPU)
- 1 reverse proxy NGINX (0.5 Go RAM, 1 vCPU)
- 1 Apache + PHP (2 Go RAM, 1 vCPU)
- 1 MariaDB (2 Go RAM, 1 vCPU)

On prévoit une marge de RAM et vCPU (hyperviseur + pics de charge) de 20%.

On a donc besoin de:

- RAM: 0.5 + 0.5 + 2 + 2 = 5 Go RAM par étudiant, plus 20% de marge = 6 Go RAM par étudiant
- vCPU: 1 + 1 + 1 + 1 = 4 vCPU par étudiant, plus 20% de marge = 4.8 vCPU par étudiant, arrondi à 5 vCPU par étudiant

Pour 40 étudiants, on a besoin de:

- RAM: 6 Go \* 40 = 240 Go RAM
- vCPU: 5 vCPU \* 40 = 200 vCPU

Les briques logicielles (Debian, NGINX, Apache, MariaDB, Proxmox) sont open-source.

## On-Premise

On retient des serveurs avec ses caractéristiques:

- CPU : 32 threads
- RAM : 64 Go

Pour 200 vCPU, on aurait besoin de 7 serveurs (200 vCPU / 32 vCPU par serveur = 6.25 serveurs, arrondi à 7 serveurs) et pour 240 Go de RAM, on aurait besoin de 4 serveurs (240 Go RAM / 64 Go RAM par serveur = 3.75 serveurs, arrondi à 4 serveurs).

Si on considère un prix par serveur de 3000€ (prix approximatif pour un serveur avec ces caractéristiques et un matériel raisonnablement récent sans être dernier cri), le coût initial pour 7 serveurs serait de 7 serveurs \* 3000€ par serveur = 21000€.

En ajoutant le coût d'électricité, si on considère une consomation moyenne de ~180W par serveur:

Mensuellement: 0.18kW \* 24 \* 30 = 129.6 kWh/mois

Coût mensuel d'électricité: 129.6 kWh \* ≈0.20€/kWh = 25.92€ par mois par serveur.

Pour les 7 serveurs, le coût mensuel d'électricité serait de 7 serveurs \* 25.92€ par serveur = 181.44€ par mois.

## Cloud OVH

On se baserait sur plusieurs serveurs dediés OVH avec Proxmox installe pour gerer les VMs.

On peut se baser sur l'offre [`ADVANCE-4`](https://www.ovhcloud.com/fr/bare-metal/advance/adv-4) qui offre 32 vCPU et 64 Gb de RAM pour 200€ par mois (installation gratuite a ce jour).

Pour 200 vCPU et 240 Go de RAM, on aurait besoin de 7 serveurs (200 vCPU / 32 vCPU par serveur = 6.25 serveurs, arrondi a 7 serveurs) et (240 Go RAM / 64 Go RAM par serveur = 3.75 serveurs, arrondi a 4 serveurs). Le dimensionnement est donc pilote par le besoin en vCPU, comme en On-Premise.

Ce qui nous fait un budget mensuel de 7 serveurs \* 200€ par serveur = 1400€ par mois.

## Rentabilité On-Premise vs Cloud OVH

Malgré le coût initial plus élevé de l'On-Premise (21000€), le coût mensuel d'électricité est relativement bas (181.44€ par mois) comparé au coût mensuel du Cloud OVH (1400€ par mois).

On peut rajouter un certain coût de maintenance pour l'On-Premise, disont 250€ par mois au total pour la maintenance du matériel et l'électricité.

Pour atteindre le seuil de rentabilité (hors encombrement, on considère que l'espace est disponible), on peut compter le nombre de mois nécessaires pour que le coût total de l'On-Premise (coût initial + coût mensuel) soit égal au coût total du Cloud OVH (coût mensuel).

On peut compter de 18 à 24 mois pour atteindre le point d'équilibre, en fonction des coûts de maintenance et d'électricité.

## Alternatives à Proxmox

On a les alternatives suivantes à Proxmox:

- [**OpenStack**](https://www.openstack.org)
  - Avantages: Très puissant, supporte une grande variété de fonctionnalités, très utilisé dans les environnements de cloud privé.
  - Inconvénients: Complexe à installer et à gérer, nécessite des ressources importantes pour fonctionner correctement.
- [**Apache CloudStack**](https://cloudstack.apache.org)
  - Avantages: Plus simple à installer et à gérer que OpenStack.
  - Inconvénients: Moins de fonctionnalités que OpenStack, plus petite communauté.
- [**OpenNebula**](https://opennebula.io)
  - Avantages: Facile à installer et à gérer, léger, supporte une variété de fonctionnalités.
  - Inconvénients: Écosystème plus petit.

**Proxmox** est un bon choix pour ce projet, mais **OpenNebula** peut être une alternative intéressante dans notre cas.
