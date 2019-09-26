<template>
    <div>
        <h1><input
                type="text"
                :placeholder="loading ? 'loading note...' : 'a catchy title'"
                v-model="entry.title"/>
        </h1>

        <div
            v-if="loading"
            class="spinner-grow"
            role="status">
            <span class="sr-only">Loading...</span>
        </div>

        <p
            class="small"
            v-show="entry.title">
            this will be a [
            <a
                v-if="!isText"
                href="#"
                @click.prevent="setText"
                class="command-link"
            >text</a>
            <strong v-else>text</strong>
            &bull;
            <a
                v-if="!isLink"
                href="#"
                @click.prevent="setLink"
                class="command-link">link</a>
            <strong v-else>link</strong>
            ] note.
        </p>

        <div
            v-show="entry.type"
            class="form view-content">
            <div
                v-if="!isText"
                class="form-group mb-3">
                <small>source</small>
                <input
                    type="text"
                    name="source"
                    placeholder="where did I see it?"
                    v-model="entry.source"
                />
            </div>

            <div class="form-group">
                <small>content</small>
                <textarea
                    placeholder="what do I want it to be? (show some markdown love)"
                    name="content"
                    rows='3'
                    v-model="entry.content"
                    ref="contentInput"
                ></textarea>
            </div>
        </div>
        <div
            v-if="!entry.type"
            class="view-content">
        </div>

        <p v-if="entry.type">
            <a
                href="#"
                @click.prevent="save(false)"
                class="btn btn-sm btn-outline-secondary"
            >save entry</a>
            &nbsp;or
            <a
                href="#"
                @click.prevent="save(true)"
                class="command-link"
            >preview it</a>.
        </p>
        <p v-else>
            <a
                href="#"
                @click.prevent="exit"
                class="command-link"
            ><i class="fas fa-long-arrow-alt-left"></i>&nbsp;go back</a>
        </p>
    </div>
</template>

<script>
import slugify from "slugify"
import Constants from "@/constants"

export default {
    props: {
        noteId: {
            type: String,
            default: "",
            required: false
        }
    },
    data() {
        return {
            loading: true,
            entry: {
                title: "",
                type: "",
                slug: "",
                content: "",
                source: ""
            }
        };
    },
    computed: {
        isText() {
            return this.entry.type === Constants.EntryTypes.TEXT
        },
        isLink() {
            return this.entry.type === Constants.EntryTypes.LINK
        },

        slug: {
            get() {
                return (
                    this.entry.slug ||
                    slugify(this.entry.title, {
                        remove: /[*+~.()'"!:@]/g
                    }).toLowerCase())
            },
            set(value) {
                this.entry.slug = value
            }
        }
    },

    async mounted() {
        if (this.noteId) {
            const url = `notes/${this.noteId}`

            try {
                const response = await this.$http.get(url)
                const note = response.data

                this.entry = {
                    title: note.title,
                    slug: note.slug,
                    content: note.content,
                    type: note.data.Type,
                    source: note.data.Source,
                }
            } catch (error) {
                this.entry = {
                    title: "",
                    type: "",
                    slug: "",
                    content: "",
                    source: ""
                }
                console.error(error)
            } finally {
                this.loading = false
            }
        } else {
            this.loading = false
        }
    },
    updated() {
        this.$nextTick(function() {
            // Code that will run only after the
            // entire view has been re-rendered
            this.autoExpand()
        })
    },

    methods: {
        setText() {
            this.entry.type = Constants.EntryTypes.TEXT
        },
        setLink() {
            this.entry.type = Constants.EntryTypes.LINK
        },

        async save(previewAfterSave) {
            this.entry.slug = this.slug

            let url = "notes"
            let method = "post"

            if (this.noteId) {
                url = `notes/${this.noteId}`
                method = "put"
            }

            try {
                const payload = {
                    title: this.entry.title,
                    slug: this.entry.slug,
                    content: this.entry.content,
                    data: {
                        Type: this.entry.type,
                        Source: this.entry.source,
                    }
                }

                const response = await this.$http.request({
                    url,
                    method,
                    data: payload
                })

                let id = this.noteId;
                if (!id && response.data.success) {
                    id = response.data.data.id
                }

                if (previewAfterSave) {
                    this.$emit(Constants.Events.ENTRY_PREVIEW, id)
                } else {
                    this.$emit(Constants.Events.ENTRY_SAVED)
                }
            } catch (error) {
                console.error(error)
            }
        },

        exit() {
            this.$emit(Constants.Events.ENTRY_SAVED)
        },

        autoExpand() {
            var field = this.$refs.contentInput

            // Reset field height
            field.style.height = "inherit"

            var computed = window.getComputedStyle(field);
            var height =
                parseInt(computed.getPropertyValue("border-top-width"), 10) +
                parseInt(computed.getPropertyValue("padding-top"), 10) +
                field.scrollHeight +
                parseInt(computed.getPropertyValue("padding-bottom"), 10) +
                parseInt(computed.getPropertyValue("border-bottom-width"), 10)

            field.style.height = height + "px"
        }
    }
}
</script>
