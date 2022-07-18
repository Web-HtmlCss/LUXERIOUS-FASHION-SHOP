Vue.component('headline', {
    template: `
        <header>
            <div class="head">
                <div class="head-box">
                    <div class="left-head">
                        <a href="/index.html" class="menu-p logo"><img src="/img/headlogo.png" alt="" class="menu-img"></a>
                        <a href="#" class="menu-p find"><img src="/img/headfind.png" alt="" class="menu-img"></a>
                    </div>
                    <div class="right-head">
                        <a href="#" class="menu-p menu"><img src="/img/headmenu.png" alt="" class="menu-img"></a>
                        <a href="/registration/registration.html" class="menu-p user"><img src="/img/headuser.png" alt="" class="menu-img"></a>
                        <cart ref="cart"></cart>
                    </div>
                </div>
            </div>
            <div class="head-space">.</div>
        </header>
    `
});
