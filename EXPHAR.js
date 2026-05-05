  // --- DONNÉES PRODUITS ---
        const products = [
            { id: 1, name: "IXINE ENFANTS", category: "Antalgique", price: 1500, img: "IXINE ENFANTS.jpg" },
            { id: 2, name: "IXINE", category: "Complément", price: 2500, img: "ixine.jpg" },
            { id: 3, name: "REGULAR DEWORMING", category: "Pédiatrie", price: 3500, img: "Regular deworming.jpg" },
            { id: 4, name: "FEBRILEX", category: "Soins", price: 2000, img:"FEBRILEX.jpg" },
            { id: 5, name: "VERZOL(BUVABLE)", category: "Protection", price: 500, img: "VERZOL (BUVABLE).jpg",width:"100px", height:"100px"},
            { id: 6, name: "VERZOL(ABENDAZOLE LISP)", category: "Hygiène", price: 3000, img: "VERZOL(ABENDAZOLE).jpg" },
        ];

        let cart = [];

        // --- INITIALISATION ---
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();
        });

        // --- NAVIGATION ---
        function showSection(sectionId) {
            // Masquer toutes les sections
            document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
            document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
            
            // Afficher la section demandée
            document.getElementById(sectionId).classList.add('active');
            document.getElementById('nav-' + sectionId).classList.add('active');
            
            // Scroll en haut
            window.scrollTo(0,0);
        }

        // --- BOUTIQUE ---
        function renderProducts() {
            const container = document.getElementById('products-container');
            container.innerHTML = products.map(product => `
                <div class="product-card">
                    <img src="${product.img}" alt="${product.name}" class="product-img">
                    <div class="product-info">
                        <div class="product-cat">${product.category}</div>
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">${product.price.toLocaleString()} FCFA</div>
                        <button class="btn-add" onclick="addToCart(${product.id})">Ajouter au panier</button>
                    </div>
                </div>
            `).join('');
        }

        function addToCart(id) {
            const product = products.find(p => p.id === id);
            cart.push(product);
            updateCartCount();
            showToast(`${product.name} ajouté au panier`);
        }

        // --- PANIER & MODAL ---
        function updateCartCount() {
            document.getElementById('cart-count').textContent = cart.length;
        }

        function openCart() {
            const modal = document.getElementById('cart-modal');
            const container = document.getElementById('cart-items-container');
            const totalContainer = document.getElementById('cart-total-container');
            const checkoutSection = document.getElementById('checkout-section');
            
            modal.classList.add('open');
            
            if (cart.length === 0) {
                container.innerHTML = '<p style="text-align:center; color:#777;">Votre panier est vide.</p>';
                totalContainer.style.display = 'none';
                checkoutSection.style.display = 'none';
            } else {
                // Grouper les produits par quantité
                const grouped = cart.reduce((acc, curr) => {
                    acc[curr.name] = acc[curr.name] || { ...curr, qty: 0 };
                    acc[curr.name].qty++;
                    return acc;
                }, {});

                let total = 0;
                container.innerHTML = Object.values(grouped).map(item => {
                    total += item.price * item.qty;
                    return `
                        <div class="cart-item">
                            <span>${item.qty}x ${item.name}</span>
                            <strong>${(item.price * item.qty).toLocaleString()} FCFA</strong>
                        </div>
                    `;
                }).join('');

                document.getElementById('cart-total-price').textContent = total.toLocaleString() + ' FCFA';
                totalContainer.style.display = 'flex';
                checkoutSection.style.display = 'block';
            }
        }

        function closeCart() {
            document.getElementById('cart-modal').classList.remove('open');
            // Reset forms
            document.querySelectorAll('.payment-form').forEach(f => f.classList.remove('active'));
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
        }

        // --- PAIEMENT ---
        function selectPayment(method, element) {
            // Reset styles
            document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
            document.querySelectorAll('.payment-form').forEach(form => form.classList.remove('active'));

            // Activate selection
            element.classList.add('selected');
            document.getElementById('form-' + method).classList.add('active');
        }

        function processPayment() {
            // Simulation du paiement
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = "Traitement en cours...";
            btn.disabled = true;

            setTimeout(() => {
                showToast("✅ Paiement validé avec succès !");
                cart = []; // Vider le panier
                updateCartCount();
                closeCart();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);
        }

        // --- FORUM ---
        document.getElementById('forum-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = this.querySelector('input').value;
            const content = this.querySelector('textarea').value;
            const now = new Date();
            const timeString = "Il y a 1 minute"; // Simulé

            const newPostHTML = `
                <div class="forum-post" style="animation: fadeIn 0.5s;">
                    <div class="post-header">
                        <strong>Vous</strong>
                        <span>${timeString}</span>
                    </div>
                    <h3 class="post-title">${title}</h3>
                    <p class="post-content">${content}</p>
                    <div class="post-actions">
                        <a href="#">💬 0 Commentaires</a>
                        <a href="#">❤️ J'aime</a>
                    </div>
                </div>
            `;

            const list = document.querySelector('.forum-list');
            list.insertAdjacentHTML('afterbegin', newPostHTML);
            
            this.reset();
            showToast("Sujet publié sur le forum !");
        });

        // --- UTILS ---
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
        document.getElementById('annee').textContent = new Date().getFullYear();