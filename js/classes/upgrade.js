class Upgradeable {
    constructor(upgrade_name, ...upgrades) {
        this.current = upgrades[0].value
        this.upgrades = upgrades
        this.level = 0
        this.upgrade_name = upgrade_name
        this.maxed = false

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
        if (!this.maxed && this.upgrades[this.level + 1].price <= points) {
            // successfully bought
            points -= this.upgrades[this.level + 1].price
            this.level++
            this.current = this.upgrades[this.level].value


            // if not maxed, show next upgrade on button
            if (this.level < this.upgrades.length - 1) this.btn_upgrade.innerText = `${this.current.toString()} > ${this.upgrades[this.level + 1].value.toString()} (${this.upgrades[this.level + 1].price} Points)`
            // else show maxed and disable
            else {
                this.btn_upgrade.innerText = `${this.current.toString()} (MAXED)`
                this.maxed = true
                if (!gameover) check_gameover()
            }
            this.title_upgrade.innerText = `${this.upgrade_name} (${this.level + 1}/${this.upgrades.length})`

            document.querySelector('#points').innerText = points

            update_upgrade_buttons()
        }
    }
}

class Upgrade {
    constructor(value, price) {
        this.value = value
        this.price = price
    }
}