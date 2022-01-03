import Dialog from "@/components/Dialog";
// import LayoutDialog from "@/components/LayoutDialog";

const defaultOptions = {
    hasActions: true,
    hasOk: true,
    hasClose: true
};

class DialogPlugin {
    constructor(Vue, globalOptions = {}) {
        this.$root = {};
        this.registeredViews = {};
        this.mounted = false;
        this.vue = Vue;
        this.options = {...defaultOptions, ...globalOptions};
    }

    mountIfNotMount() {
        if (this.mounted) return;
        this.$root = (() => {
            const DialogConstructor = this.vue.extend(Dialog);
            const el = document.createElement('div');
            document.querySelector('#app').appendChild(el);

            const vm = new DialogConstructor({...this.options.context});
            vm.registeredViews = this.registeredViews;
            console.log(vm)

            return vm.$mount(el);
        })();

        this.mounted = true;
    }

    open(localOptions = {}) {
        console.log(this);
        this.mountIfNotMount();
        return new Promise((resolve, reject) => {
            localOptions.id = 'dialog-' + Date.now();
            localOptions.promiseResolver = resolve;
            localOptions.promiseRejecter = reject;

            this.$root.commit({...this.options, ...localOptions});
        })
    }

    registerView(name, define) {
        this.registeredViews[name] = define;
    }

    view(name, define) {
        this.registerView(name, define);
        return this;
    }
}

export default function install(Vue, options) {
    Vue.dialog = new DialogPlugin(Vue, options)

    Object.defineProperties(Vue.prototype, {
        $dialog: {
            get () {
                return Vue.dialog
            }
        }
    })
}
