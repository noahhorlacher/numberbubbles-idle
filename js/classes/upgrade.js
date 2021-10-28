class Upgradeable {
    constructor(upgrade_name, ...upgrades) {
        this.current = upgrades[0].value
        this.upgrades = upgrades
        this.level = 0
        this.upgrade_name = upgrade_name

        // inject into upgrade screen
        let container_upgrades = document.querySelector('upgrades')
        let container_upgrade = document.createElement('upgrade')

        this.title_upgrade = document.createElement('h3')
        this.title_upgrade.innerText = `${upgrade_name} (${this.level + 1}/${this.upgrades.length})`

        this.btn_upgrade = document.createElement('btn')
        this.btn_upgrade.innerText = `${this.current} > ${upgrades[1].value.toString()} (${upgrades[1].price} Points)`
        this.btn_upgrade.title = `Click to upgrade ${upgrade_name}`
        this.btn_upgrade.addEventListener('click', e => {
            if (this.btn_upgrade.getAttribute('disabled') != 'true') this.upgrade()
        })

        container_upgrade.append(this.title_upgrade, this.btn_upgrade)
        container_upgrades.append(container_upgrade)
    }

    reset() {
        this.current = this.upgrades[0].value
        this.level = 0
    }

    upgrade() {
        // upgrade if not maxed out and enough cash
        if (this.level < this.upgrades.length - 1) {
            if (this.upgrades[this.level + 1].buy()) {
                // successfully bought
                this.level++
                this.current = this.upgrades[this.level].value
                if (this.level + 1 < this.upgrades.length) this.btn_upgrade.innerText = `${this.current.toString()} > ${this.upgrades[this.level + 1].value.toString()} (${this.upgrades[this.level].price} Points)`
                else {
                    this.btn_upgrade.innerText = `${this.current.toString()} (MAXED)`
                    this.btn_upgrade.setAttribute('disabled', true)
                }
                this.title_upgrade.innerText = `${this.upgrade_name} (${this.level + 1}/${this.upgrades.length})`

                document.querySelector('#points').innerText = points
            }
        }
    }
}

class Upgrade {
    constructor(value, price) {
        this.value = value
        this.price = price
    }

    buy() {
        if (points >= this.price) {
            points -= this.price
            return true
        }
        return false
    }
}