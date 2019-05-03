<template>
    <div>
        <p class="header-img">
            <img src="https://blob.alejof.dev/assets/code-icon-light.png">
        </p>
        <div class="d-flex w-80 justify-content-between">
            <h1>drafts</h1>
            <h1 class="text-muted">
                <router-link to="/published"><i class="fas fa-angle-double-right"></i>&nbsp;<span class="d-none d-sm-inline">published</span></router-link>
            </h1>
        </div>

        <div class="view-content">
            <div class="list-group">
                <div class="list-group-item hover-trigger">
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-0"><strong>note title</strong></p>
                        <p class="mb-0">3 days ago</p>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <small>plain text</small>
                        <small class="hover-commands">
                            <a href="#" class="command-link">edit</a> &bull;
                            <a href="#" class="command-link">delete</a>
                        </small>
                    </div>
                </div>
                <div class="list-group-item hover-trigger">
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-0"><strong>note title</strong></p>
                        <p class="mb-0">3 days ago</p>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <small>a link to <span class="text-muted">google.com</span></small>
                        <small class="hover-commands">
                            <a href="#" class="command-link">edit</a> &bull;
                            <a href="#" class="command-link">delete</a>
                        </small>
                    </div>
                </div>
                <div class="list-group-item hover-trigger">
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-0"><strong>note title</strong></p>
                        <p class="mb-0">3 days ago</p>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <small>a quote from <span class="text-muted">myself</span></small>
                        <small class="hover-commands">
                            <a href="#" class="command-link">edit</a> &bull;
                            <a href="#" class="command-link">delete</a>
                        </small>
                    </div>
                </div>
            </div>
        </div>

        <hr />
        <p>
            <router-link
                to="/new"
                class="btn btn-sm btn-outline-secondary"
            >create a new entry</router-link>
            &nbsp;or <router-link
                to="/"
                class="command-link"
            >go back</router-link>.
        </p>
    </div>
</template>

<script>
export default {};
</script>
